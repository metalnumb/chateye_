#!/bin/bash
git add .
git commit -a -m 'commit'
git push
heroku logs --tail
echo
echo
echo
