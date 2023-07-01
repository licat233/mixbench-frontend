# !/bin/bash

#给予shell文件执行权限：chmod a+x gen.sh
#执行shell文件：./gen.sh

domain="http://micro.mixbench.net"

current_path=$(
  cd $(dirname $0)
  pwd
)

cd "${current_path}/swagger"

replace_string() {
  # 读取第一个参数作为原始字符串
  original_string=$1
  # 读取第二个参数作为要替换的字符串
  old_string=$2
  # 读取第三个参数作为要替换为的新字符串
  new_string=$3

  if [ -z "$original_string" ]; then
    return 1
  fi

  if [ -z "$old_string" ]; then
    return 1
  fi

  if [ -z "$new_string" ]; then
    return 1
  fi

  # 检查 sed 命令是否支持 -E 参数（用于启用扩展正则表达式）
  if [[ "$(sed --help 2>&1 | grep '\-E')" ]]; then
    # 如果支持 -E 参数，则使用新的替换命令
    echo "$original_string" | sed -E "s/$old_string/$new_string/g"
  else
    # 不支持 -E 参数，则使用旧的替换命令
    echo "$original_string" | sed "s/$old_string/$new_string/g"
  fi
}

replace_file_string() {
  # 读取第一个参数作为文件名
  FILENAME="$1"
  # 读取第二个参数作为要替换的字符串
  OLD_STR="$2"
  # 读取第三个参数作为要替换为的新字符串，默认为空字符串
  NEW_STR="$3"
  # 表示要修改第几行，默认全部替换
  LINE="$4"
  if [ "$LINE"="," ]; then
    LINE=""
  fi

  # 对于没有指定文件名或原始字符串或新字符串的情况，直接返回错误码
  if [ -z "$FILENAME" ] || [ -z "$OLD_STR" ]; then
    return 1
  fi

  # 判断 LINE 是否为非负整数
  if [[ "$LINE" =~ ^[0-9]+$ ]]; then
    # 如果 LINE 是一个非负整数，则进行操作
    # 判断操作系统类型，在 macOS 上需要指定空字符串作为备份文件名
    if [ "$(uname)" == "Darwin" ]; then
      sed -i "" "${LINE}s/${OLD_STR}/${NEW_STR}/" "$FILENAME"
    else
      sed -i "${LINE}s/${OLD_STR}/${NEW_STR}/" "$FILENAME"
    fi

    # 检查 sed 命令是否执行成功
    if [ $? -ne 0 ]; then
      return 1
    fi
  elif [ -n "$LINE" ]; then
    # 如果 LINE 不为空且不是一个非负整数，则需要进行错误处理
    echo "LINE 参数必须为非负整数"
    return 1
  else
    # 如果 LINE 为空，则替换所有行
    if [ "$(uname)" == "Darwin" ]; then
      sed -i "" "s/${OLD_STR}/${NEW_STR}/g" "$FILENAME"
    else
      sed -i "s/${OLD_STR}/${NEW_STR}/g" "$FILENAME"
    fi

    # 检查 sed 命令是否执行成功
    if [ $? -ne 0 ]; then
      return 1
    fi
  fi

  # 如果没有问题，返回 0，表示执行成功
  return 0
}

# 更新Components.ts接口文件与swagger.json网关文件
names=("admin" "captcha" "luckydraw")
files=("__Components.ts" "__.ts")
func_download_file() {
  hasWebapi=true
  for name in ${names[@]}; do
    for f in ${files[@]}; do
      filename=$(replace_string $f "__" $name)
      tsurl="${domain}/v1/static/${name}/${filename}"
      curl_code=$(curl -o new-${filename} --insecure -s -w %{http_code} $tsurl)
      if [ $curl_code != "200" ]; then
        echo "下载失败: $tsurl"
        rm -f "new-${filename}"
        exit
      fi
      rm -f $filename
      mv "new-${filename}" $filename
      echo "${filename}文件 —— 下载完成"
    done
  done
}

# 修改webapi接口导入文件
func_modify_webapi() {
  for name in ${names[@]}; do
    filename="${name}.ts"
    replace_file_string $filename ".\/gocliRequest" ".\/webapi"
    echo "update ${filename} successfully"
  done
}

# 给所有的请求方法，加上options入参
func_add_options() {
  for name in ${names[@]}; do
    filename="${name}.ts"
    STR1=") {"
    NEWSTR1=", options?: Record<string, any>) {"
    replace_file_string $filename "$STR1" "$NEWSTR1"

    STR2="(, options?:"
    STR2=$(echo $STR2 | sed -e 's/[]\/$*.^[]/\\&/g')
    NEWSTR2="(options?:"
    replace_file_string $filename "$STR2" "$NEWSTR2"

    STR3=")"
    NEWSTR3=", options)"
    for line in $(sed -n '/return webapi./=' $filename); do
      OLD_STR=$(sed -n $(expr ${line}p) $filename)
      OLD_STR=$(echo $OLD_STR | sed -e 's/[]\/$*.^[]/\\&/g')
      NEW_STR=$(echo ${OLD_STR/$STR3/$NEWSTR3})
      replace_file_string $filename "$OLD_STR" "$NEW_STR"
    done

    STR4="\`, options)"
    STR4=$(echo $STR4 | sed -e 's/[]\/$*.^[]/\\&/g')
    NEWSTR4="\`, null, options)"
    replace_file_string $filename "$STR4" "$NEWSTR4"
  done
  echo "api function parameter added successfully"
}

func_download_file

func_modify_webapi

func_add_options

echo "------------------------【update successfully】------------------------"
