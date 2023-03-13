#!/bin/bash
git fetch
git pull origin masterc
docker compose down
docker compose up -d --build