---
layout: page
title: "Data"
date:  2017-09-08
---

This is a collection of datasets that I make available for public use.
These often come from projects that you can find [here](/projects).
I do not guarantee the stability of these datasets as I will likely be changing them to update a project or an underlying pipeline could break over time.
I advise downloading and storing these data sets on your own servers rather than pulling into your application directly, then if need-be poll for updated content regularly.

<ul class='data-sets'>
  <li class='data-set-listing'>
    <a class='title' href='https://apps.msull92.com/data/mood/responses'>Mood Responses</a> - This is a collection of responses from <a href="https://github.com/msull92/mood-texter">mood-texter</a> which texts me throughout the work day to ask how I'm feeling. This is the base data I use to generate the "Mood Matrix by Day" data set.
  </li>
  <li class='data-set-listing'>
    <a class='title' href='https://apps.msull92.com/data/mood/sentiment-by-day'>Mood Sentiment by Day of Week</a> - This is an aggregated version of <code>Mood Responses</code> for <a class='title' href='/projects/mood_meter'>this project</a>.
  </li>
  <li class='data-set-listing'>
    <a class='title' href='https://apps.msull92.com/data/mood/sentiment-by-hour'>Mood Sentiment by Hour</a> - This is an aggregated version of <code>Mood Responses</code> for <a class='title' href='/projects/mood_meter'>this project</a>.
  </li>
  <li class='data-set-listing'>
    <a class='title' href='https://apps.msull92.com/data/mood-matrix/co-occurrence-map.json'>Mood Matrix by Day</a> - This is a collection of data points about my mood in matrix form. The relationships represented in the matrix show how two moods co-occur on the same day. Read more <a href="/projects/mood_co-occurrence">here</a>.
  </li>
</ul>
