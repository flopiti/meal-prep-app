#!/bin/bash
cd /apps/meal-prep-app
git fetch
git pull origin masterc
docker compose down
docker compose up -d --build