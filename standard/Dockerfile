FROM mhart/alpine-node:11.12 AS build-env
LABEL maintainer="kai@kaidam.ltd"

RUN apk update
RUN apk upgrade
RUN apk add bash git

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . /app

ENTRYPOINT ["yarn", "template:publish"]
