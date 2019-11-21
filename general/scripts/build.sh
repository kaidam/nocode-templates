#!/bin/bash
#--nocode-config nocode-config.js \
set -ex
nocode build \
  --base-url /builder/website/loadable/ \
  --build-path build \
  --entry-point-browser ./src/browser.js \
  --entry-point-server ./src/server.js \
  --static-path ./src/static
  
  
