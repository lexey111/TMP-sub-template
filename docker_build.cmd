#!/bin/bash
docker build -f Dockerfile.prod -t template .
docker run --name temp template
docker cp temp:/app/dist ./dist
docker rm temp
docker image rm template
