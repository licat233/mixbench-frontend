#!/bin/bash
###
 # @Author: licat
 # @Date: 2022-12-27 22:19:07
 # @LastEditors: licat
 # @LastEditTime: 2022-12-27 22:35:49
 # @Description: 
### 

current_path=$(
  cd $(dirname $0)
  pwd
)

cd $current_path

swagger-codegen generate -i http://micro.mixbench.net/v1/api/admin/static/swagger.json -l typescript-axios -o ./swagger/admin/
swagger-codegen generate -i http://micro.mixbench.net/v1/api/captcha/static/swagger.json -l typescript-axios -o ./swagger/captcha/
swagger-codegen generate -i http://micro.mixbench.net/v1/api/luckdraw/static/swagger.json -l typescript-axios -o ./swagger/luckdraw/

