#!/bin/zsh

PREVIOUS=`pwd`

# pull recent changes to dependencies and update theirs.
git submodule foreach 'git pull && git submodule update --init' 2> /dev/null

# update styles.
cd dependencies/main/ && ./build.sh
cd $PREVIOUS

cd www
find . | grep \.git\$ | xargs rm -rf
cd $PREVIOUS

# copy whispeer assets to www.
cp -r ./dependencies/main/* ./www/

# override config and crypto webworkers.
cp ./overrides/config.js ./www/assets/js/config.js
cp ./overrides/config.xml ./www/config.xml
cp ./overrides/generalWorkerInclude.js ./www/assets/js/cryptoWorker/generalWorkerInclude.js

# override base href.
sed 's/base href="\/"/base href="\."/' www/index.html > www/index-fixed.html
mv www/index-fixed.html www/index.html
