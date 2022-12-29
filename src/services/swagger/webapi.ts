/*
 * @Author: licat
 * @Date: 2022-12-26 17:56:58
 * @LastEditors: licat
 * @LastEditTime: 2022-12-29 11:05:26
 * @Description: 
 */
import { request } from '@umijs/max';

//skipErrorHandler: true


// 核心请求方法
const baseRequest = async function <Type>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any, options?: Record<string, any>) {
  // const skipErrorHandler = options && options.skipErrorHandler
  const params = method === 'GET' ? body : null;
  return request<Type>(url, {
    method,
    data: body,
    params,
    ...(options || {}),
  });
}

export const webapi = {
  get: async function <Type>(url: string, body?: any, options?: Record<string, any>) {
    return baseRequest<Type>('GET', url, body, options)
  },
  post: async function <Type>(url: string, body?: any, options?: Record<string, any>) {
    return baseRequest<Type>('POST', url, body, options)
  },
  put: async function <Type>(url: string, body?: any, options?: Record<string, any>) {
    return baseRequest<Type>('PUT', url, body, options)
  },
  delete: async function <Type>(url: string, body?: any, options?: Record<string, any>) {
    return baseRequest<Type>('DELETE', url, body, options)
  },
  request: baseRequest,
}
