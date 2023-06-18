# Ops

We were able to complete all 4 steps of containerisation.
- We created a Dockerfile for our app
- We created a docker-compose.yml file to run our app
- We created a docker-compose-e2e.yml file to run the end to end tests

You can start them using `run.sh` and `run-e2e.sh` respectively.

## Dockerfile

The docker file is pretty basic. We used the classical 2 step build process to reduce the size of the image. We used the `node:18.12.1-alpine` image to build our app and then copied the build to another image `node:18.12.1-alpine` to run it.

Even though we tried to have clean code allowing for easy URL changes, we still resorted to using `sed` to change the URL of the API. This is not ideal, but it works.

## docker-compose.yml

The docker-compose is a bit more complex, since we have a Postgres database to run. But it still is pretty readable.

## Healthcheck

We added a healthcheck to the docker-compose file. It checks if the app is running and if the database is up and running. If not, it will restart the container. We verify that postgres is up, and use `wget` to check if the app is running.

## Overall

The app is working as expected. We can run it locally using docker-compose. Deploying to a cloud provider should be relatively easy.