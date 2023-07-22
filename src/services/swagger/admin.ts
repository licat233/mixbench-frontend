import webapi from "./webapi"
import type * as components from "./adminComponents"
export * from "./adminComponents"

/**
 * @description "登录"
 * @param req
 */
export function login(req: components.LoginReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/public/login`, req, options)
}

/**
 * @description "邮箱登录"
 * @param req
 */
export function loginByEmail(req: components.LoginByEmailReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/public/loginByEmail`, req, options)
}

/**
 * @description "给登录邮箱发送验证码"
 * @param req
 */
export function loginEmailCaptcha(req: components.LoginEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/public/loginEmailCaptcha`, req, options)
}

/**
 * @description "给注册邮箱发送验证码"
 * @param req
 */
export function registerEmailCaptcha(req: components.RegisterEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/public/registerEmailCaptcha`, req, options)
}

/**
 * @description "给绑定邮箱发送验证码"
 * @param req
 */
export function bindEmailCaptcha(req: components.BindEmailCaptchaReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/public/bindEmailCaptcha`, req, options)
}

/**
 * @description '预留的调试端口'
 * @param params
 */
export function test(params: components.TestReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/public/test`, params, options)
}

/**
 * @description "密码加密端口"
 * @param params
 */
export function pwdEncryption(params: components.PwdEncryptionReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/public/pwdEncryption`, params, options)
}

/**
 * @description "密码比较端口"
 * @param params
 */
export function pwdCompare(params: components.PwdCompareReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/public/pwdCompare`, params, options)
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
 * @description "忘记密码，通过邮箱重置密码"
 * @param req
 */
export function forgotPassword(req: components.ForgotPasswordReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer/forgotPassword`, req, options)
}

/**
 * @description "添加活动 基础API"
 * @param req
 */
export function addCampaign(req: components.AddCampaignReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/campaign`, req, options)
}

/**
 * @description "更新活动 基础API"
 * @param req
 */
export function putCampaign(req: components.PutCampaignReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/campaign`, req, options)
}

/**
 * @description "获取活动 基础API"
 * @param req
 */
export function getCampaign(req: components.GetCampaignReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/campaign`, req, options)
}

/**
 * @description "删除活动 基础API"
 * @param req
 */
export function delCampaign(req: components.DelCampaignReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/campaign`, req, options)
}

/**
 * @description "获取活动列表 基础API"
 * @param params
 */
export function getCampaignList(params: components.GetCampaignListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/campaign/list`, params, options)
}

/**
 * @description "获取活动枚举列表 基础API"
 * @param req
 */
export function getCampaignEnums(req: components.GetCampaignEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/campaign/enums`, req, options)
}

/**
 * @description "添加公司 基础API"
 * @param req
 */
export function addCompany(req: components.AddCompanyReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/company`, req, options)
}

/**
 * @description "更新公司 基础API"
 * @param req
 */
export function putCompany(req: components.PutCompanyReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/company`, req, options)
}

/**
 * @description "获取公司 基础API"
 * @param req
 */
export function getCompany(req: components.GetCompanyReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/company`, req, options)
}

/**
 * @description "删除公司 基础API"
 * @param req
 */
export function delCompany(req: components.DelCompanyReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/company`, req, options)
}

/**
 * @description "获取公司列表 基础API"
 * @param params
 */
export function getCompanyList(params: components.GetCompanyListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/company/list`, params, options)
}

/**
 * @description "获取公司枚举列表 基础API"
 * @param req
 */
export function getCompanyEnums(req: components.GetCompanyEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/company/enums`, req, options)
}

/**
 * @description "添加项目 基础API"
 * @param req
 */
export function addProject(req: components.AddProjectReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "更新项目 基础API"
 * @param req
 */
export function putProject(req: components.PutProjectReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "获取项目 基础API"
 * @param req
 */
export function getProject(req: components.GetProjectReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "删除项目 基础API"
 * @param req
 */
export function delProject(req: components.DelProjectReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "获取项目列表 基础API"
 * @param params
 */
export function getProjectList(params: components.GetProjectListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/list`, params, options)
}

/**
 * @description "获取项目枚举列表 基础API"
 * @param req
 */
export function getProjectEnums(req: components.GetProjectEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/enums`, req, options)
}

/**
 * @description "添加网站 基础API"
 * @param req
 */
export function addWeb(req: components.AddWebReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/web`, req, options)
}

/**
 * @description "更新网站 基础API"
 * @param req
 */
export function putWeb(req: components.PutWebReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/web`, req, options)
}

/**
 * @description "获取网站 基础API"
 * @param req
 */
export function getWeb(req: components.GetWebReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/web`, req, options)
}

/**
 * @description "删除网站 基础API"
 * @param req
 */
export function delWeb(req: components.DelWebReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/web`, req, options)
}

/**
 * @description "获取网站列表 基础API"
 * @param params
 */
export function getWebList(params: components.GetWebListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/web/list`, params, options)
}

/**
 * @description "获取网站枚举列表 基础API"
 * @param req
 */
export function getWebEnums(req: components.GetWebEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/web/enums`, req, options)
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
