---
layout: post
title: Picture in Picture on your Mac without Safari
date: 2017-08-14
categories: hack bash
description: How to use Picture in Picture on your Mac with Youtube, without needing Safari.
---

I really love the [Picture in Picture](https://support.apple.com/en-us/HT206997) feature that Apple offers on Macs.
I don't love that you need to use Safari to use it for Youtube.
I recently found some tools that allow you to use it fairly easily without Safari.

I primarily use this to play videos in the corner of my monitor while I'm working for background noise.
Eventually, I hope to also wrap this in a script to easily let me watch a playlist without manually grabbing the video ID each time.

## Requirements
First step is to install [Node.js](https://nodejs.org/en/), [ytdl](https://github.com/fent/node-ytdl), and [open-pip-cli](https://github.com/albinekb/open-pip-cli).
The `README` of `open-pip-cli` is where I got this fun hack.

**Note:** You'll need macOS Sierra (10.12) or above.

## Bash Shortcut
Next step is to add a shortcut to our `~/.bash_profile` so we can use this command easily.
After adding this, make sure to run the command `source ~/.bash_profile` so you can use the command you just added.

```bash
# youtube
function yt () {
  ytdl --print-url --filter-container=mp4 $1 | open-pip
}
```

## Usage
Now all that's left is to use our shiny new toy.
Find the ID of video you want to watch on Youtube and copy the it from the browser address bar.

{% raw %}
The url follows this format: `https://www.youtube.com/watch?v={{ VIDEO_ID }}`
{% endraw %}

Finally, paste that into the command below and you should have a video pane pop up with the video you provided.

{% raw %}
```bash
$ yt {{ VIDEO_ID }}
```
{% endraw %}

## Bonus
If you read the `README` of `open-pip-cli` you'll also see that you can use it to watch Twitch streams.
Now you can be even less productive.
