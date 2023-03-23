#!/bin/bash
git fetch
git reset --hard HEAD
git checkout origin/master
chown -R deployer:deployer .
npm install
npm run build
nohup npm start