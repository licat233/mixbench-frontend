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
