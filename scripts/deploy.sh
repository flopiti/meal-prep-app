#!/bin/bash
git fetch
git reset --hard HEAD
git checkout origin/master
docker compose down
docker compose up -d --build