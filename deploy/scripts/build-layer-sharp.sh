#!/bin/bash

if [ "$1" == "--clean" ]; then
    rm -rf .build/layer/sharp
    mkdir -p .build/layer/sharp
fi

docker build --file docker/sharp/Dockerfile --tag amazonlinux:nodejs_14 docker/sharp
cp .layers/image/origin/index.mjs .build/layer/sharp/index.mjs

if [ "$1" == "--clean" ]; then
    docker run --rm --volume ${PWD}/.build/layer/sharp:/build amazonlinux:nodejs_14 /bin/bash -c "source ~/.bashrc; npm init -f -y; npm install sharp --save && npm install --save ipfs-http-client && npm install --only=prod"
fi

cd .build/layer/sharp && zip -FS -q -r ../../../.layers/sharp-layer.zip * && cd ../../..
