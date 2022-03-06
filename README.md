# AREA - Year-end Project - {EPITECH}

## Goal of the Project

The goal of this project is to discover, as a whole, the software platform that you have chosen through the
creation of a business application.
To do this, you we implemented a software suite that functions similar to that of [IFTTT](https://ifttt.com/) or [Zapier](https://zapier.com/).

### Launch

To deploy AREA in production mode, please use the bellow commands:

```sh
docker-compose build && docker-compose up
```

To deploy AREA in develoment mode, please use the bellow commands:

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

Project will automatically re-compile the part you changed.

In both case, if you are running the project locally, you can access front-end
using this url: <http://localhost:8081> and download the apk for mobile app at <http://localhost:8081/client.apk>.

### Languages

Web Front-end: React

Mobile Front-end: Flutter

Back-end: NestJS, a progressive framework of Node.js

### Documentation

You can see our back-end documentation using the following command
```sh
npx @compodoc/compodoc -p tsconfig.json -s
```

## Services

* Gitlab
* Mail
* Area
* Discord
* SMS
* Weather
* Github

## Actions and Reactions

Here is a list of differents actions and reactions implemented in our project

### Actions

* Gitlab
    * Push event
    * Merge request event
    * Issue event
    * Deployment event
    * Confidential issue event
* Area
    * Area deleted
    * Detect number of areas
    * Area created
    * Username changed

* Weather
    * Change in temperature

* Github
    * Any new repository event

### Reactions

* SMS
    * Send an SMS

* Area
    * Change username

* Discord
    * Send a discord message
    * Send a discord embed

* Mail
    * Send an email