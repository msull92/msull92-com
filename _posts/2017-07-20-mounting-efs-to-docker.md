---
layout: post
title: Mounting EFS to Docker
date: 2017-07-20
categories: infrastructure aws docker
---

Normally I'd recommend storing files and binary data for a web application in an external storage service like [AWS S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) and following a [twelve-factor approach](https://12factor.net/) to development.
This provides a clean separation of concerns between your code and stateful storage of data, allowing you to kill servers/containers at will and not worry about data loss.
However, sometimes you need to migrate legacy code that does not follow this standard.
These types of legacy projects often depend on living in a specific folder structure and reaching into the directory of another application directly to manipulate its data.
In a perfect world, these applications would be rewritten and brought up to new standards.
Depending on time, money, and other constraints this often isn't possible and you need to make the best of what you've got.

An approach that I've recently worked with is to take these kinds of projects and use [Docker](https://docs.docker.com/) to encapsulate their code.
This allows us to easily maintain whatever specific environment the finicky code needs to run and do it in a very reproducible way.
Making sure that we maintain environment makes sure that we don't add new technical debt by moving it into a completely new environment with minor differences that later arise into negative impacts.
Making use of this encapsulation we also give ourselves an easier path to migration in the future so that things will be better documented and more portable.

The second half of this approach is to mount [AWS EFS](https://aws.amazon.com/documentation/efs/) to our container so that we don't break our applications' existing workflow...**as much as we'd love to rewrite it**.
By mounting this as a volume into our Docker container we can still allow the application to communicate in the way it knows how, but now with the benefit of being in a separate storage system that has, according to AWS, "unlimited" file space and each application can be scaled, killed, or started at will without data loss.

## Create the File System
The first step of this process is to create your EFS on AWS.
This is a pretty straightforward process that is well documented by AWS [here](http://docs.aws.amazon.com/efs/latest/ug/wt1-getting-started.html).
I won't get into the step-by-step process of it here because I don't want to spend my time rewriting AWS' documentation but I do want to cover some important configuration factors for this specific use case.
As said, we may have many scripts, apps, and services that will be accessing the EFS simultaneously I'd advise looking into using the `Max IO` option.
This should be set if you plan to have more than tens of applications accessing the same EFS.
Also, you'll want to make sure that you create the file system in the same VPC and region where you plan to use it.
Finally, make sure that you have a mount target for each subnet that you'll need access from with a security group that allows access to the proper applications.

## Mount the EFS to the Host
Depending on how you're hosting your Docker applications this step can vary wildly.
For my current use case, however, we are not putting these containerized applications onto a container platform–*yet*–like Kubernetes or AWS ECS.
Instead, we are just running the container directly on top of an EC2 instance.

For this use case, the mounting of the EFS is pretty straightforward.
First, you create the directory where you plan to mount it.
I've chosen `/data` so that it's obvious that it's stateful.

```bash
$ mkdir /data
```

Second, you mount the EFS to the directory.

```bash
$ sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 MOUNT_TARGET_DNS:/ /data
```

Viola!
You have your EFS mounted to `/data` on your host instance.
You can test it out via by placing a file in there and then opening that file from another server.

This mounting method is great for prototyping purposes but to have it persist across reboots look into [fstab](http://docs.aws.amazon.com/efs/latest/ug/mount-fs-auto-mount-onreboot.html).
If you're using a tool like Ansible, like I am, this becomes really easy with something like this.

{% raw %}
```yaml
- name: Mount paths
  mount: name={{ item.path }} src={{ item.dns }}:/ fstype=nfs4 opts="nfsvers=4.1" state=mounted
  with_items: "{{ efs_mounts }}"
```
{% endraw %}

This will handle all of the logic of making sure that it mounts automatically on reboot for you.

## Mount the EFS to the Container
Once the host has the EFS mounted to it, getting it accessible to the container become pretty trivial.
Docker has support for mounting volumes via the option flag `-v`.

```bash
$ docker run --name hello-world -p 80:5000 -v /data:/data carinamarina/hello-world-app
```

And that's it!
Now you can just worry about getting the legacy script running inside of Docker and the number of refactoring changes to migrate the code will drastically reduce, to possibly only needing to point at a different directory.
