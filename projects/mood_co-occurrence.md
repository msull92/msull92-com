---
layout: page
title: "Mood Co-occurrence"
description: This is an analytical representation of my mood over time, updated on a daily basis.
---

This is an analytical representation of my mood over time, updated on a daily basis.
I created a [service](https://github.com/msull92/mood-mailer) that emails me throughout the work day to ask how I'm feeling.
I respond with a one word answer and it records that in a [csv](http://apps.msull92.com/data/mood/responses).
Every hour, another [script](https://github.com/msull92/mood-matrix) runs against that data and spits out a [co-occurrence map](http://apps.msull92.com/data/mood-matrix/co-occurrence-map.json) that groups words together using [natural language processing](https://cloud.google.com/natural-language/).
Co-occurrence is determined by which words are responded with one the same day.

I was inspired by a [co-occurrence graph](https://bost.ocks.org/mike/miserables/) that Mike Bostock made for Les Misérables. Most of the code for the graph came directly from this source, with tweaks for my use.

**Note:** You can find the data I used for this and other projects, [here](/data).

<div id="co-occurrence">
  <ul id="legend">
    <strong>Sort by</strong>
    <select id="order">
      <option value="name">name</option>
      <option value="count">frequency</option>
      <option value="group">group</option>
    </select>
    <strong>Sentiment</strong>
    <li class="positive"><span> </span> positive</li>
    <li class="neutral"><span> </span> neutral</li>
    <li class="negative"><span> </span> negative</li>
  </ul>

  <div id="graphs"></div>
</div>

<link rel="stylesheet" type="text/css" href="graphs.css">
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="graphs.js"></script>
