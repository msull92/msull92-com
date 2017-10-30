FROM nginx

# Install jekyll and its dependencies
RUN apt-get update && apt-get -y install build-essential patch ruby ruby-dev rubygems git gcc make zlib1g-dev liblzma-dev \
	&& git clone https://github.com/rubygems/rubygems.git /home/rubygems/ \
	&& rm -rf /var/lib/apt/lists/*

RUN gem install bundler

WORKDIR /tmp/jekyll-site

ADD Gemfile* /tmp/jekyll-site/
RUN bundle install

ADD . /tmp/jekyll-site

RUN bundle exec jekyll build
RUN cp -r /tmp/jekyll-site/_site/* /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
