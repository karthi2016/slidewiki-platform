#!/bin/bash

repo='slidewiki/platform'
docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
result="$(docker build -q .)"
if [[ $result == sha256:* ]]; then
    image_hash="$(echo $result | sed 's/sha256://')"
    echo "image hash: ${image_hash}"
    for tag in "$@"
    do
        echo "tagging image: $repo:$tag"
        docker tag $image_hash $repo:$tag
        echo "pushing $repo:$tag to DockerHub"
        docker push $repo:$tag
    done
else
    echo "Docker build failed!"
    exit -1
fi
