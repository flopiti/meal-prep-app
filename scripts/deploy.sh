#!/bin/bash
git fetch
git reset --hard HEAD
git checkout origin/master
npm install
npm run build
npm start