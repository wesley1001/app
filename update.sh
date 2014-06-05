#!/bin/zsh

# pull recent changes to dependencies and update theirs.
git submodule foreach 'git pull && git submodule update --init'

# copy whispeer assets to www.
cp -r ./dependencies/ssn/main/* ./www/

# override config and crypto webworkers.
cp ./overrides/config.js ./www/assets/js/config.js
cp ./overrides/generalWorkerInclude.js ./www/assets/js/cryptoWorker/generalWorkerInclude.js

