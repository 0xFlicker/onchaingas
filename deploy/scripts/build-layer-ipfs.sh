#!/bin/bash

if [ "$1" == "--clean" ]; then
    rm -rf .build/layer/ipfs/origin
    mkdir -p .build/layer/ipfs/origin
fi

docker build --file docker/ipfs/Dockerfile --tag amazonlinux:nodejs_16 docker/ipfs
cp .layers/ipfs/origin/index.mjs .build/layer/ipfs/origin/index.mjs

if [ "$1" == "--clean" ]; then
    docker run --rm --volume ${PWD}/.build/layer/ipfs/origin:/build amazonlinux:nodejs_16 /bin/bash -c "source ~/.bashrc; npm init -f -y; npm install ipfs-http-client --save && npm install --only=prod"
fi

cd .build/layer/ipfs/origin && zip -FS -q -r ../../../../.layers/ipfs-origin-layer.zip * && cd ../../../..
