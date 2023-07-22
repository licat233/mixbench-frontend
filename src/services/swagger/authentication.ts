import webapi from "./webapi"
import type * as components from "./authenticationComponents"
export * from "./authenticationComponents"

/**
 * @description "预留的调试端口"
 * @param params
 */
export function test(params: components.TestReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/authentication/test`, params, options)
}

/**
 * @description "jwt鉴权接口"
 */
export function auth(options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/authentication/auth`, null, options)
}

/**
 * @description "获取数学验证码"
 * @param req
 */
export function getMathCaptcha(req: components.CaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/authentication/captcha/math`, req, options)
}

/**
 * @description "验证码图片"
 */
export function showCaptchaImage(options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/authentication/captcha/show`, null, options)
}

/**
 * @description "验证码校验"
 * @param req
 */
export function verifyCaptcha(req: components.ProcessCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/authentication/captcha/process`, req, options)
}

/**
 * @description "向邮箱发送验证码"
 * @param req
 */
export function sendEmailCaptcha(req: components.EmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/authentication/captcha/email`, req, options)
}

/**
 * @description "邮箱验证码校验"
 * @param req
 */
export function verifyEmailCaptcha(req: components.EmailCaptchaVerifyReq, options?: Record<string, any>) {
	return webapi.post<components.EmailCaptchaResp>(`/v1/api/authentication/captcha/email/process`, req, options)
}
