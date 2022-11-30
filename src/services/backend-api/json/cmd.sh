#/bin/bash
current_path=$(
    cd $(dirname $0)
    pwd
)

cd $current_path;

npx @openapitools/openapi-generator-cli generate -g typescript-axios -i captcha.json -o ./captcha-api/

openapi-generator generate -i captcha.json -g typescript-axios -o ./captcha-api

docker run -d -e GENERATOR_HOST=http://127.0.0.1 -p 82:8080 openapitools/openapi-generator-online