FROM nginx:alpine

RUN apk update && apk add bash

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /var/www

# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/conf.d/
