/**
 * @description: 后端api服务接口
 */
const api_host = "http://micro.mixbench.net";

/**
 * @description: 静态资源服务接口
 */
const static_host = "http://static.mixbench.net";

/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    '/v1/api/': {
      // 要代理的地址
      target: api_host,
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      ws: true,
    },
    '/static/': {
      // 要代理的地址
      target: static_host,
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: api_host,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: api_host,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

// export default proxyConfig;
