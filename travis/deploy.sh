#!/bin/bash

if [ $1 == "master" ]; then
    export DOCKER_HOST="$DOCKERHOST_EXPERIMENTAL"
    openssl aes-256-cbc -K $encrypted_3ef84d34223e_key -iv $encrypted_3ef84d34223e_iv -in travis/deployment_keys.experimental.tar.enc -out deployment_keys.tar -d
    cp travis/docker-compose_experimental.yml docker-compose.yml
    cp travis/config.experimental.env .env
elif [ $1 == "latest-sprint" ]; then
    export DOCKER_HOST="$DOCKERHOST_TESTING"
    openssl aes-256-cbc -K $encrypted_aefbc973e9e7_key -iv $encrypted_aefbc973e9e7_iv -in travis/deployment_keys.testing.tar.enc -out deployment_keys.tar -d
    cp travis/docker-compose_testing.yml docker-compose.yml
    cp travis/config.testing.env .env
else
    echo "Unknown configuration: $1"
    exit -1
fi

tar xvf deployment_keys.tar && rm -f deployment_keys.tar && sudo chmod 0444 *.pem && mv -f -t ~/.docker/ cert.pem key.pem ca.pem
export DOCKER_TLS_VERIFY=1

docker-compose pull
docker-compose stop
echo y | docker-compose rm
docker-compose up -d
docker rmi $(docker images | grep "<none>" | awk "{print \$3}")
