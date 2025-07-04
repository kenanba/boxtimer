#!/bin/sh

cd /app

npm install -g create-vite

create-vite temp-vue --template vue --no-git

cp -r temp-vue/* .
cp -r temp-vue/.[^.]* .

rm -rf temp-vue

npm install


npm run dev -- --host