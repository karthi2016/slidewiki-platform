#!/bin/bash

REPO='slidewiki/platform'

RESULT="$(docker build -q .)"
if [[ ! $RESULT == sha256:* ]]; then
  echo "Docker build failed!"
  exit -1
fi

IMAGE_HASH="$(echo $RESULT | sed 's/sha256://')"
echo "image hash: $IMAGE_HASH"

RESULT="$(docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD")"
if [[ ! $RESULT == "Login Succeeded" ]]; then
  echo "Docker Hub Login failed!"
  exit -2
fi

if [ $1 == "master" ]; then pushtag $IMAGE_HASH $REPO:master ; fi
if [ $1 == "release" ]; then
    CURRENT_SPRINT=$(curl -s https://$BUILDUSER_NAME:$BUILDUSER_PASSWD@slidewiki.atlassian.net/rest/agile/1.0/board/9/sprint?state=active | grep -ioE "Sprint [0-9]+" | sed 's/Sprint //' )
    pushtag $IMAGE_HASH $REPO:sprint-$CURRENT_SPRINT
    pushtag $IMAGE_HASH $REPO:latest-sprint
fi


pushtag () {
  echo "Pushing $2 to DockerHub"
  docker tag $1 $2
  docker push $2
}
