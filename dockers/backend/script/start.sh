#!/usr/bin/env sh
# set -e

npm install

# Build the code to create the dist directory
npm run build

# tail -f /dev/null

rm -rf ./src/typeorm/migration/*
npm run typeorm:migrate --name=Init
npm run typeorm:run
npm run start:prod
