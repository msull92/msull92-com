---
layout: post
title: RSS to Instapaper Loader
date: 2017-08-21
categories: ruby
description: Here's a scheduled script that will watch all of your RSS feeds and push them into Instapaper.
---

For awhile, I was using Zapier to load RSS feeds into Instapaper.
Before that I was using IFTTT.
Neither was a great tool for this because in order to set up a single feed you'd have to go through multiple screens and duplicate your effort.
This was even worse if you had to go back later and update them.
And most horrifically, it cost money on Zapier if you had more than 4 RSS feeds to watch.

What I wanted was a way to just list urls of RSS feeds that I was interested in and then have them show up in my Instapaper account.
I figured with my background, the easiest thing would be to just write a scheduled script to do this.
So that's what I did, I wrote [rss-to-instapaper-loader](https://github.com/msull92/rss-to-instapaper-loader) and launched it on a server.

The way it works is pretty basic.
You configure it by giving it some environment variables.

- `INSTAPAPER_USERNAME` - is your unique Instapaper username
- `INSTAPAPER_PASSWORD` - is your Instapaper password
- `RSS_FEED_URLS` - is a comma-separated list of RSS/atom feed urls for it to watch

Once booted with these environment variables it will watch your list of feed urls and when it sees an entry it will post to the Instapaper API.
This process happens every five minutes.
**Viola!** you have a RSS feed loader.

Finally, to make sure that it isn't loading the same url into your Instapaper account multiple times it will log the URL to a `urls.log` file that gets checked before sending to Instapaper.

**Note:** The easiest way to launch this tool is to use the `Dockerfile` and `docker-compose.yml` files that are included in this repository.
I host these on a server that I have on DigitalOcean. It's not necessary to mount the `urls.log` file to the container, but it is recommended so that state is maintained between containers so in case you need to reboot, redeploy, etc. then your Instapaper account won't be flooded with old articles.

*If you have any changes that would be helpful for others, please feel free to fork the repository and make a pull-request so we all get the goodness!*
