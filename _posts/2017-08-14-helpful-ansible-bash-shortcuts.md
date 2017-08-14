---
layout: post
title: Helpful Ansible Bash Shortcuts
date: 2017-08-14
categories: infrastructure ansible bash
---

I have a series of bash aliases for Ansible that make my life better, so I thought I'd share them.
If you choose to use any of these just make sure to add them to your `~/.bash_profile`, assuming you're on a Mac.
Then after editing this file make sure to run `source ~/.bash_profile` so that you can use them immediately.

**Note:** In order for these shortcuts to work, you'll need to make sure to install [hf](https://github.com/hugows/hf) and make sure that its binary is in your `$PATH`.

## Ansible Playbook Alias
This command is super simple, but the one I use the most.
It just takes your arguments and options then passes them to the `ansible-playbook` command.
This honestly saves me hundreds of keystrokes per day.

```bash
# ansible playbook alias
function ap () {
  ansible-playbook "$@"
}
```

## Interactive Ansible Vault
These commands will run `hf` in the current directory and allow you to fuzzy search for a file and once the file is selected it will decrypt, encrypt, or show it accordingly.

```bash
# interactive ansible vault decrypt
function iavd () {
  hf -cmd="ansible-vault decrypt"
}

# interactive ansible vault encrypt
function iave () {
  hf -cmd="ansible-vault encrypt"
}

# interactive ansible vault view
function iavv () {
  hf -cmd="ansible-vault view"
}
```
