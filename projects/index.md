---
layout: page
title: "Projects"
date:  2017-06-05
---

This is a collection of various projects that I'm working on or have done in the past.

## Data Visualization

<ul class='projects'>
  <li class='project-listing'>
    <a class='title' href='financial_map'>Financial Map</a> - This is an analytical representation of my finances.
  </li>
  <li class='project-listing'>
    <a class='title' href='mood_co-occurrence'>Mood Co-occurrence</a> - This is an analytical representation of my mood over time, updated on a daily basis.
  </li>
</ul>

## Software

<ul class='projects'>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/applications-router'>applications-router</a> - The NGINX application for routing traffic to <code>msull92.com</code> and <code>apps.msull92.com</code>.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/boinc_drone'>boinc_drone</a> - This is for monitoring a <a href="https://boinc.berkeley.edu/">Boinc</a> process and then reporting back to a central server. I created this for a project that never came to be but I still use this tool for monitoring my Boinc daemons programmatically.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/dotfiles'>dotfiles</a> - A collection of my dotfiles so I can easily set up a new computer the same as I usually have it.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/mood-mailer'>mood-mailer</a> - Script that emails me throughout the work day to ask about my mood, then stores my responses. The results are used by <code>mood-matrix-generator</code> for <a href="/projects/mood_co-occurrence/">this project</a>.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/mood-matrix-generator'>mood-matrix-generator</a> - Script that generates JSON from a collection of responses saved by <code>mood-mailer</code> for a mood co-occurrence graph, seen <a href="/projects/mood_co-occurrence/">here</a>.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/msull92-com'>msull92-com</a> - A <a href="https://jekyllrb.com/">jekyll</a> project that generates the source code for <code>msull92.com</code>.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/pandora-database-loader'>pandora-database-loader</a> - Script for grabbing my music data from <a href="https://www.pandora.com/">Pandora</a>, enriching it with analysis data from <a href="https://www.spotify.com/">Spotify</a>, and then storing it in a database for analysis later.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/pandora-database-presenter'>pandora-database-presenter</a> - NGINX application that connects to a database of music data loaded by <code>pandora-database-loader</code> and presents it as a simple API.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/rss-to-instapaper-loader'>rss-to-instapaper-loader</a> - Script for watching RSS feeds and adding them to my Instapaper account.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/selfie-receiver'>selfie-receiver</a> - A server that waits for selfies to be sent in reply to <code>selfie-texter</code>. It stores the received selfie with a timestamped file name for later use.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/selfie-texter'>selfie-texter</a> - A script that texts me to ask for a selfie via <a href="">Twilio</a>.
  </li>
  <li class='project-listing'>
    <a class='title' href='https://github.com/msull92/terraform-provider-deis'>terraform-provider-deis</a> - A provider plugin for <a href="https://www.terraform.io/">Terraform</a> that allows you to create and manage applications that are hosted on the self-hosted <a href="http://deis.io/">Deis</a> platform.
  </li>
</ul>
