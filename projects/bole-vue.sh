#!/usr/bin/env bash 

echo "Start deployment bole-vue"
cd '/root/code/bole-vue'

echo "pulling source code..."
git pull

echo "install packageing"
npm install

echo "start run build"
npm run build
echo "build Finished."

cd /root
rm -rf dist
cp -a /root/code/bole-vue/dist .
echo "copy new dist success"
