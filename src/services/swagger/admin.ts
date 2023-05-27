import webapi from "./webapi"
import * as components from "./adminComponents"
export * from "./adminComponents"

/**
 * @description "鉴权接口"
 */
export function auth(options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/admin/auth`, null, options)
}

/**
 * @description "登录"
 * @param req
 */
export function login(req: components.LoginReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/login`, req, options)
}

/**
 * @description "邮箱登录"
 * @param req
 */
export function loginByEmail(req: components.LoginByEmailReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/loginByEmail`, req, options)
}

/**
 * @description "给登录邮箱发送验证码"
 * @param req
 */
export function loginEmailCaptcha(req: components.LoginEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/loginEmailCaptcha`, req, options)
}

/**
 * @description "给注册邮箱发送验证码"
 * @param req
 */
export function registerEmailCaptcha(req: components.RegisterEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/registerEmailCaptcha`, req, options)
}

/**
 * @description "给绑定邮箱发送验证码"
 * @param req
 */
export function bindEmailCaptcha(req: components.BindEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/bindEmailCaptcha`, req, options)
}

/**
 * @description '预留的调试端口'
 * @param params
 */
export function test(params: components.TestReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/test`, params, options)
}

/**
 * @description "注销登录"
 */
export function logout(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/logout`, null, options)
}

/**
 * @description "获取当前用户信息"
 */
export function currentUser(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/currentUser`, null, options)
}

/**
 * @description "添加管理员 基础API"
 * @param req
 */
export function addAdminer(req: components.AddAdminerReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "更新管理员 基础API"
 * @param req
 */
export function putAdminer(req: components.PutAdminerReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "获取管理员 基础API"
 * @param req
 */
export function getAdminer(req: components.GetAdminerReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "删除管理员 基础API"
 * @param req
 */
export function delAdminer(req: components.DelAdminerReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "获取管理员列表 基础API"
 * @param params
 */
export function getAdminerList(params: components.GetAdminerListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer/list`, params, options)
}

/**
 * @description "获取管理员枚举列表 基础API"
 * @param req
 */
export function getAdminerEnums(req: components.GetAdminerEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer/enums`, req, options)
}

/**
 * @description "管理员校验自己的密码"
 * @param req
 */
export function verifyPassword(req: components.VerifyPasswordReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer/verifyPassword`, req, options)
}

/**
 * @description "管理员修改自己的账号信息，当修改密码时，需要提供验证码"
 * @param req
 */
export function putCurrent(req: components.PutCurrentReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer/putCurrent`, req, options)
}

/**
 * @description "获取自己的账号信息"
 */
export function currentInfo(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer/currentInfo`, null, options)
}

/**
 * @description "修改自己的密码"
 * @param req
 */
export function putPassword(req: components.PutPasswordReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer/putPassword`, req, options)
}

/**
 * @description "上传头像"
 */
export function uploadAvatar(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/upload/avatar`, null, options)
}

/**
 * @description "上传logo"
 */
export function uploadLogo(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/upload/logo`, null, options)
}

/**
 * @description "上传图片"
 */
export function uploadImg(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/upload/image`, null, options)
}
