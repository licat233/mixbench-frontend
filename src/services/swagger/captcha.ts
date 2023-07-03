import webapi from "./webapi"
import type * as components from "./captchaComponents"
export * from "./captchaComponents"

/**
 * @description "获取数学验证码"
 * @param req
 */
export function mathCaptcha(req: components.CaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/captcha/math`, req, options)
}

/**
 * @description "验证码图片"
 */
export function showCaptcha(options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/captcha/show`, null, options)
}

/**
 * @description "验证码校验"
 * @param req
 */
export function processCaptcha(req: components.ProcessCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/captcha/process`, req, options)
}

/**
 * @description "向邮箱发送验证码"
 * @param req
 */
export function emailCaptcha(req: components.EmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/captcha/email`, req, options)
}

/**
 * @description "邮箱验证码校验"
 * @param req
 */
export function emailCaptchaVerify(req: components.EmailCaptchaVerifyReq, options?: Record<string, any>) {
	return webapi.post<components.EmailCaptchaResp>(`/v1/api/captcha/email/process`, req, options)
}

/**
 * @description '预留的调试端口'
 * @param params
 */
export function test(params: components.TestReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/captcha/test`, params, options)
}
