---
layout: page
title: Mood Meter
description: This is a graph of how my mood changes throughout the day.
---

This show my mood over time, updated a constantly updating dataset.
I created a [service](https://github.com/msull92/mood-texter) that texts me throughout the day to ask how I'm feeling.
I respond with a one word answer and it records it [here](https://apps.msull92.com/data/mood/responses).
Finally I process the responses using [natural language processing](https://cloud.google.com/natural-language/).

**Note:** You can find the data I used for this and other projects, [here](/data).

<div id="mood-meter">
  <ul id="legend">
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
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="graphs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="moment_tz.js"></script>
