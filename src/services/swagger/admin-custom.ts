import { webapi } from "./webapi"
import type * as components from "./adminComponents"
export * from "./adminComponents"

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
 * @description "获取活动列表，因为设计数组传参，post方式会比较合适"
 * @param req
 */
export function activityList(req: components.ActivityListReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/activity/list`, req, options)
}

/**
 * @description 
 * @param params
 */
export function activityDetail(params: components.ActivityDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity/detail`, params, options)
}

/**
 * @description 
 * @param req
 */
export function activityDetails(req: components.ActivityListReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/activity/details`, req, options)
}

/**
 * @description "获取活动信息"
 * @param params
 */
export function activityInfo(params: components.ActivityGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity`, params, options)
}

/**
 * @description "添加活动"
 * @param req
 */
export function activityAdd(req: components.ActivityAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/activity`, req, options)
}

/**
 * @description "编辑活动"
 * @param req
 */
export function activityPut(req: components.ActivityPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/activity`, req, options)
}

/**
 * @description "删除活动"
 * @param req
 */
export function activityDel(req: components.ActivityDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/activity`, req, options)
}

/**
 * @description "枚举列表"
 * @param params
 */
export function activityEnumList(params: components.EnumListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity/enumList`, params, options)
}

/**
 * @description "指定项目的活动"
 * @param params
 */
export function projectActivity(params: components.ProjectActivityReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity/projectActivity`, params, options)
}

/**
 * @description "获取某用户参与的活动"
 * @param params
 */
export function userActivities(params: components.UserActivitiesReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity/userActivities`, params, options)
}

/**
 * @description 获取活动模式枚举列表
 */
export function activityPatternEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/activity/patternEnumList`, null, options)
}

/**
 * @description "获取管理员列表"
 * @param params
 */
export function adminerList(params: components.AdminerListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer/list`, params, options)
}

/**
 * @description "获取管理员信息"
 * @param params
 */
export function adminerInfo(params: components.AdminerGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer`, params, options)
}

/**
 * @description "添加管理员"
 * @param req
 */
export function adminerAdd(req: components.AdminerAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "编辑管理员"
 * @param req
 */
export function adminerPut(req: components.AdminerPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "删除管理员"
 * @param req
 */
export function adminerDel(req: components.AdminerDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/adminer`, req, options)
}

/**
 * @description "枚举列表"
 */
export function adminerEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/adminer/enumList`, null, options)
}

/**
 * @description "获取抽奖单列表"
 * @param params
 */
export function luckerList(params: components.LuckerListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/lucker/list`, params, options)
}

/**
 * @description "获取抽奖单详细列表"
 * @param req
 */
export function luckerDetails(req: components.LuckerDetailsReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/lucker/details`, req, options)
}

/**
 * @description "获取抽奖单信息"
 * @param params
 */
export function luckerInfo(params: components.LuckerGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/lucker`, params, options)
}

/**
 * @description "添加抽奖单"
 * @param req
 */
export function luckerAdd(req: components.LuckerAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/lucker`, req, options)
}

/**
 * @description "编辑抽奖单"
 * @param req
 */
export function luckerPut(req: components.LuckerPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/lucker`, req, options)
}

/**
 * @description "编辑抽奖单by prize"
 * @param req
 */
export function putByPrize(req: components.LuckerPutByPrizeReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/lucker/putByPrize`, req, options)
}

/**
 * @description "删除抽奖单"
 * @param req
 */
export function luckerDel(req: components.LuckerDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/lucker`, req, options)
}

/**
 * @description "枚举列表"
 */
export function luckerEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/lucker/enumList`, null, options)
}

/**
 * @description "获取奖品列表"
 * @param params
 */
export function prizeList(params: components.PrizeListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prize/list`, params, options)
}

/**
 * @description "获取奖品信息"
 * @param params
 */
export function prizeInfo(params: components.PrizeGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prize`, params, options)
}

/**
 * @description "添加奖品"
 * @param req
 */
export function prizeAdd(req: components.PrizeAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/prize`, req, options)
}

/**
 * @description "编辑奖品"
 * @param req
 */
export function prizePut(req: components.PrizePutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/prize`, req, options)
}

/**
 * @description "删除奖品"
 * @param req
 */
export function prizeDel(req: components.PrizeDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/prize`, req, options)
}

/**
 * @description "枚举列表"
 */
export function prizeEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prize/enumList`, null, options)
}

/**
 * @description "获取某活动奖品池的奖品"
 * @param params
 */
export function activityPrizes(params: components.ActivityPrizesReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prize/activityPrizes`, params, options)
}

/**
 * @description "获取奖品级别列表"
 * @param params
 */
export function prizeGradeList(params: components.PrizeGradeListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prizeGrade/list`, params, options)
}

/**
 * @description "获取奖品级别信息"
 * @param params
 */
export function prizeGradeInfo(params: components.PrizeGradeGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prizeGrade`, params, options)
}

/**
 * @description "添加奖品级别"
 * @param req
 */
export function prizeGradeAdd(req: components.PrizeGradeAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/prizeGrade`, req, options)
}

/**
 * @description "编辑奖品级别"
 * @param req
 */
export function prizeGradePut(req: components.PrizeGradePutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/prizeGrade`, req, options)
}

/**
 * @description "删除奖品级别"
 * @param req
 */
export function prizeGradeDel(req: components.PrizeGradeDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/prizeGrade`, req, options)
}

/**
 * @description "枚举列表"
 */
export function prizeGradeEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prizeGrade/enumList`, null, options)
}

/**
 * @description "获取奖品池列表"
 * @param params
 */
export function prizesPoolList(params: components.PrizesPoolListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prizesPool/list`, params, options)
}

/**
 * @description "获取奖品池信息"
 * @param params
 */
export function prizesPoolInfo(params: components.PrizesPoolGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/prizesPool`, params, options)
}

/**
 * @description "添加奖品池"
 * @param req
 */
export function prizesPoolAdd(req: components.PrizesPoolAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/prizesPool`, req, options)
}

/**
 * @description "编辑奖品池"
 * @param req
 */
export function prizesPoolPut(req: components.PrizesPoolPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/prizesPool`, req, options)
}

/**
 * @description "删除奖品池"
 * @param req
 */
export function prizesPoolDel(req: components.PrizesPoolDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/prizesPool`, req, options)
}

/**
 * @description 重置某活动的奖品池概率
 * @param req
 */
export function resetLuckValue(req: components.ResetLuckValueReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/prizesPool/resetLuckValue`, req, options)
}

/**
 * @description "获取项目列表"
 * @param params
 */
export function projectList(params: components.ProjectListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/list`, params, options)
}

/**
 * @description "获取项目详细列表"
 * @param params
 */
export function projectDetails(params: components.ProjectListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/projectDetails`, params, options)
}

/**
 * @description "获取项目信息"
 * @param params
 */
export function projectInfo(params: components.ProjectGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project`, params, options)
}

/**
 * @description "添加项目"
 * @param req
 */
export function projectAdd(req: components.ProjectAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "编辑项目"
 * @param req
 */
export function projectPut(req: components.ProjectPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "删除项目"
 * @param req
 */
export function projectDel(req: components.ProjectDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/project`, req, options)
}

/**
 * @description "枚举列表"
 */
export function projectEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/enumList`, null, options)
}

/**
 * @description "获取项目详细"
 * @param params
 */
export function projectDetail(params: components.ProjectDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/projectDetail`, params, options)
}

/**
 * @description "获取项目树形枚举数据 []TreeOptions"
 */
export function projectTreeOptions(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/project/projectTreeOptions`, null, options)
}

/**
 * @description "获取授权策略"
 * @param req
 */
export function getPolicy(req: components.PolicyReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/policy`, req, options)
}

/**
 * @description "添加授权策略"
 * @param req
 */
export function addPolicy(req: components.PolicyReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/rbac/policy`, req, options)
}

/**
 * @description "修改授权规则"
 * @param req
 */
export function putPolicy(req: components.PolicyReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/rbac/policy`, req, options)
}

/**
 * @description "删除授权规则"
 * @param req
 */
export function delPolicy(req: components.PolicyReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/rbac/policy`, req, options)
}

/**
 * @description "批量获取授权策略"
 * @param req
 */
export function getPolicies(req: components.PoliciesReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/policies`, req, options)
}

/**
 * @description "批量添加授权策略"
 * @param req
 */
export function addPolicies(req: components.PoliciesReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/rbac/policies`, req, options)
}

/**
 * @description "批量修改授权规则"
 * @param req
 */
export function putPolicies(req: components.PoliciesReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/rbac/policies`, req, options)
}

/**
 * @description "批量删除授权规则"
 * @param req
 */
export function delPolicies(req: components.PoliciesReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/rbac/policies`, req, options)
}

/**
 * @description "获取当前策略中显示的操作列表"
 */
export function getAllActions(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/all-actions`, null, options)
}

/**
 * @description "获取策略中的所有授权规则"
 */
export function getAllPolicy(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/all-policies`, null, options)
}

/**
 * @description "获取当前策略中显示的 object 列表"
 */
export function getAllObjects(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/all-objects`, null, options)
}

/**
 * @description "将获得所有与该域相关联的用户"
 * @param req
 */
export function getAllUsersByDomain(req: components.DomainReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/domain-users`, req, options)
}

/**
 * @description "获取用户在某域内的权限"
 * @param req
 */
export function getPermissionsForUserInDomain(req: components.RoleAndDomainReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/rbac/permissions`, req, options)
}

/**
 * @description "获取用户列表"
 * @param params
 */
export function userList(params: components.UserListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/user/list`, params, options)
}

/**
 * @description "获取用户详情列表"
 * @param params
 */
export function userDetail(params: components.UserDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/user/detail`, params, options)
}

/**
 * @description "获取用户详情列表"
 * @param params
 */
export function userDetails(params: components.UserListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/user/details`, params, options)
}

/**
 * @description "获取用户信息"
 * @param params
 */
export function userInfo(params: components.UserGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/user`, params, options)
}

/**
 * @description "添加用户"
 * @param req
 */
export function userAdd(req: components.UserAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/user`, req, options)
}

/**
 * @description "编辑用户"
 * @param req
 */
export function userPut(req: components.UserPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/user`, req, options)
}

/**
 * @description "删除用户"
 * @param req
 */
export function userDel(req: components.UserDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/user`, req, options)
}

/**
 * @description "枚举列表"
 */
export function userEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/user/enumList`, null, options)
}

/**
 * @description "获取用户池列表"
 * @param params
 */
export function usersPoolList(params: components.UsersPoolListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/usersPool/list`, params, options)
}

/**
 * @description "获取用户池信息"
 * @param params
 */
export function usersPoolInfo(params: components.UsersPoolGetReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/usersPool`, params, options)
}

/**
 * @description "添加用户池"
 * @param req
 */
export function usersPoolAdd(req: components.UsersPoolAddReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/usersPool`, req, options)
}

/**
 * @description "编辑用户池"
 * @param req
 */
export function usersPoolPut(req: components.UsersPoolPutReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/admin/usersPool`, req, options)
}

/**
 * @description "删除用户池"
 * @param req
 */
export function usersPoolDel(req: components.UsersPoolDelReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/admin/usersPool`, req, options)
}

/**
 * @description "管理员校验自己的密码"
 * @param req
 */
export function verifyPassword(req: components.VerifyPasswordReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/account/verifyPassword`, req, options)
}

/**
 * @description 管理员修改自己的账号信息，当修改密码时，需要提供验证码
 * @param req
 */
export function putCurrent(req: components.PutCurrentReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/account/putCurrent`, req, options)
}

/**
 * @description "获取自己的账号信息"
 */
export function currentInfo(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/admin/account/currentInfo`, null, options)
}

/**
 * @description "修改自己的密码"
 * @param req
 */
export function putPassword(req: components.PutPasswordReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/admin/account/putPassword`, req, options)
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
