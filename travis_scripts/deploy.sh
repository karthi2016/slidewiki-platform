#!/bin/bash

tar xvf deployment_keys.tar && rm -f deployment_keys.tar && sudo chmod 0444 *.pem && mv -f -t ~/.docker/ cert.pem key.pem ca.pem

if [ $1 == "master" ]; then
    export DOCKER_HOST="$DOCKERHOST_EXPERIMENTAL"
elif [ $1 == "latest-sprint" ]; then
    export DOCKER_HOST="$DOCKERHOST_TESTING"
else
    echo "Unknown configuration: $1"
    exit -1
fi

export DOCKER_TLS_VERIFY=1

docker-compose -f=docker-compose_$1.yml pull
docker-compose -f=docker-compose_$1.yml stop
echo y | docker-compose -f=docker-compose_$1.yml rm
docker-compose -f=docker-compose_$1.yml up -d
docker rmi $(docker images | grep "<none>" | awk "{print \$3}")
