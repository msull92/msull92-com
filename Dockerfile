FROM tonisuter/jekyll-nginx

RUN gem install bundler

WORKDIR /tmp/jekyll-site

ADD Gemfile* /tmp/jekyll-site/
RUN bundle install

ADD . /tmp/jekyll-site

RUN bundle exec jekyll build
RUN cp -r /tmp/jekyll-site/_site/* /usr/share/nginx/html
