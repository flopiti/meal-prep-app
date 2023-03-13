#!/bin/bash
git fetch
git pull origin master
docker compose down
docker compose up -d --build