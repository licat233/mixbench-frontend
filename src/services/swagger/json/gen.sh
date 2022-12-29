#!/bin/bash

current_path=$(
  cd $(dirname $0)
  pwd
)

cd $current_path

# openapi-generator generate -i admin.json -g typescript -o ./test/
swagger-codegen generate -i admin.json -l typescript-axios -o ./test/

