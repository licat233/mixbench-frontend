#!/bin/bash
###
 # @Author: licat
 # @Date: 2022-12-27 15:16:27
 # @LastEditors: licat
 # @LastEditTime: 2022-12-30 10:30:44
 # @Description: 
### 

current_path=$(
  cd $(dirname $0)
  pwd
)

cd $current_path


git add .
git commit -m update --no-verify
git push -u origin master

echo "git push 已完成"

#强制将本机的代码库推送到远端仓库，并覆盖！
#git push -f origin --all

