# mixbench 前端

## 解决 i18n-remove 报错问题

step 1

```bash
yarn add eslint-config-prettier --dev
yarn add eslint-plugin-unicorn --dev
```

step 2

文件`node_modules/@umijs/lint/dist/config/eslint/index.js`
将`es2022: true`改为`es2021: true`

step 3

```bash
yarn run i18n-remove
```

step 4

会直接把默认的菜单配置移除掉，在路由配置文件中加上name字段

## 解决导入包路径报错问题

外部目录有大写字母，导致vscode飘红，但并不影响使用，tsconfig加入下面配置解决红字问题

+ 解决方案 1：

```json
"compilerOptions": {
  "forceConsistentCasingInFileNames": false
}
```

+ 解决方案 2：

vscode升级后，本地的ts版本和项目的ts版本不一致导致，
解决方法： vscode里面 按住 Ctrl/Command + Shift + P ----> 选择typescript版本 ----> 选择使用工作区版本
