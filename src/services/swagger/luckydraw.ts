import webapi from "./webapi"
import * as components from "./luckydrawComponents"
export * from "./luckydrawComponents"

/**
 * @description "抽奖者身份验证"
 * @param req
 */
export function userIdentify(req: components.UserIdentifyReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/userIdentify`, req, options)
}

/**
 * @description "获取活动奖品列表"
 * @param req
 */
export function activityPrizes(req: components.ActivityPrizesReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/activityPrizes`, req, options)
}

/**
 * @description '预留的调试端口'
 * @param params
 */
export function test(params: components.TestReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/test`, params, options)
}

/**
 * @description "获取自己在某活动的中奖名单"
 * @param req
 */
export function getALuckyList(req: components.GetALuckyListReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/activityLuckyList`, req, options)
}

/**
 * @description "抽取奖品"
 * @param req
 */
export function luckydraw(req: components.LuckydrawReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/luckydraw`, req, options)
}

/**
 * @description "查询中奖信息"
 * @param req
 */
export function searchLucky(req: components.SearchLuckyReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/searchLucky`, req, options)
}

/**
 * @description "挑选奖品"
 * @param req
 */
export function selectPrizes(req: components.SelectPrizesReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/selectPrizes`, req, options)
}

/**
 * @description "添加活动 基础API"
 * @param req
 */
export function addActivity(req: components.AddActivityReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/activity`, req, options)
}

/**
 * @description "更新活动 基础API"
 * @param req
 */
export function putActivity(req: components.PutActivityReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/activity`, req, options)
}

/**
 * @description "获取活动 基础API"
 * @param req
 */
export function getActivity(req: components.GetActivityReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity`, req, options)
}

/**
 * @description "删除活动 基础API"
 * @param req
 */
export function delActivity(req: components.DelActivityReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/activity`, req, options)
}

/**
 * @description "获取活动列表 基础API"
 * @param params
 */
export function getActivityList(params: components.GetActivityListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/list`, params, options)
}

/**
 * @description "获取活动枚举列表 基础API"
 * @param req
 */
export function getActivityEnums(req: components.GetActivityEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/enums`, req, options)
}

/**
 * @description 
 * @param params
 */
export function activityDetail(params: components.ActivityDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/detail`, params, options)
}

/**
 * @description 
 * @param params
 */
export function activityDetails(params: components.GetActivityListReqParams, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/activity/details`, params, options)
}

/**
 * @description "指定项目的活动"
 * @param params
 */
export function projectActivities(params: components.ProjectActivitiesReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/projectActivities`, params, options)
}

/**
 * @description "获取某用户参与的活动"
 * @param params
 */
export function userActivities(params: components.UserActivitiesReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/userActivities`, params, options)
}

/**
 * @description 获取活动模式枚举列表
 */
export function activityPatternEnumList(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/activity/patternEnumList`, null, options)
}

/**
 * @description "添加中奖名单 基础API"
 * @param req
 */
export function addLucky(req: components.AddLuckyReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/lucky`, req, options)
}

/**
 * @description "更新中奖名单 基础API"
 * @param req
 */
export function putLucky(req: components.PutLuckyReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/lucky`, req, options)
}

/**
 * @description "获取中奖名单 基础API"
 * @param req
 */
export function getLucky(req: components.GetLuckyReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/lucky`, req, options)
}

/**
 * @description "删除中奖名单 基础API"
 * @param req
 */
export function delLucky(req: components.DelLuckyReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/lucky`, req, options)
}

/**
 * @description "获取中奖名单列表 基础API"
 * @param params
 */
export function getLuckyList(params: components.GetLuckyListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/lucky/list`, params, options)
}

/**
 * @description "获取中奖名单枚举列表 基础API"
 * @param req
 */
export function getLuckyEnums(req: components.GetLuckyEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/lucky/enums`, req, options)
}

/**
 * @description "获取抽奖单详细列表"
 * @param req
 */
export function luckyDetails(req: components.LuckyDetailsReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/lucky/details`, req, options)
}

/**
 * @description "编辑抽奖单by prize"
 * @param req
 */
export function putLuckyByPrize(req: components.LuckyPutByPrizeReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/lucky/putLuckyByPrize`, req, options)
}

/**
 * @description "添加奖品名单 基础API"
 * @param req
 */
export function addPrize(req: components.AddPrizeReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/prize`, req, options)
}

/**
 * @description "更新奖品名单 基础API"
 * @param req
 */
export function putPrize(req: components.PutPrizeReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/prize`, req, options)
}

/**
 * @description "获取奖品名单 基础API"
 * @param req
 */
export function getPrize(req: components.GetPrizeReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prize`, req, options)
}

/**
 * @description "删除奖品名单 基础API"
 * @param req
 */
export function delPrize(req: components.DelPrizeReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/prize`, req, options)
}

/**
 * @description "获取奖品名单列表 基础API"
 * @param params
 */
export function getPrizeList(params: components.GetPrizeListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prize/list`, params, options)
}

/**
 * @description "获取奖品名单枚举列表 基础API"
 * @param req
 */
export function getPrizeEnums(req: components.GetPrizeEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prize/enums`, req, options)
}

/**
 * @description "获取活动的奖品"
 * @param req
 */
export function getActivityPrizes(req: components.GetActivityPrizesReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prize/activityPrizes`, req, options)
}

/**
 * @description "添加奖品级别 基础API"
 * @param req
 */
export function addPrizeGrade(req: components.AddPrizeGradeReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/prizeGrade`, req, options)
}

/**
 * @description "更新奖品级别 基础API"
 * @param req
 */
export function putPrizeGrade(req: components.PutPrizeGradeReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/prizeGrade`, req, options)
}

/**
 * @description "获取奖品级别 基础API"
 * @param req
 */
export function getPrizeGrade(req: components.GetPrizeGradeReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizeGrade`, req, options)
}

/**
 * @description "删除奖品级别 基础API"
 * @param req
 */
export function delPrizeGrade(req: components.DelPrizeGradeReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/prizeGrade`, req, options)
}

/**
 * @description "获取奖品级别列表 基础API"
 * @param params
 */
export function getPrizeGradeList(params: components.GetPrizeGradeListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizeGrade/list`, params, options)
}

/**
 * @description "获取奖品级别枚举列表 基础API"
 * @param req
 */
export function getPrizeGradeEnums(req: components.GetPrizeGradeEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizeGrade/enums`, req, options)
}

/**
 * @description "添加活动奖品池，某活动中的奖品信息 基础API"
 * @param req
 */
export function addPrizePool(req: components.AddPrizePoolReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/prizePool`, req, options)
}

/**
 * @description "更新活动奖品池，某活动中的奖品信息 基础API"
 * @param req
 */
export function putPrizePool(req: components.PutPrizePoolReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/prizePool`, req, options)
}

/**
 * @description "获取活动奖品池，某活动中的奖品信息 基础API"
 * @param req
 */
export function getPrizePool(req: components.GetPrizePoolReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizePool`, req, options)
}

/**
 * @description "删除活动奖品池，某活动中的奖品信息 基础API"
 * @param req
 */
export function delPrizePool(req: components.DelPrizePoolReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/prizePool`, req, options)
}

/**
 * @description "获取活动奖品池，某活动中的奖品信息列表 基础API"
 * @param params
 */
export function getPrizePoolList(params: components.GetPrizePoolListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizePool/list`, params, options)
}

/**
 * @description "获取活动奖品池，某活动中的奖品信息枚举列表 基础API"
 * @param req
 */
export function getPrizePoolEnums(req: components.GetPrizePoolEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/prizePool/enums`, req, options)
}

/**
 * @description "重置某活动的奖品池概率"
 * @param req
 */
export function resetLuckValue(req: components.ResetLuckValueReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/prizePool/resetLuckValue`, req, options)
}

/**
 * @description "添加项目 基础API"
 * @param req
 */
export function addProject(req: components.AddProjectReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/project`, req, options)
}

/**
 * @description "更新项目 基础API"
 * @param req
 */
export function putProject(req: components.PutProjectReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/project`, req, options)
}

/**
 * @description "获取项目 基础API"
 * @param req
 */
export function getProject(req: components.GetProjectReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project`, req, options)
}

/**
 * @description "删除项目 基础API"
 * @param req
 */
export function delProject(req: components.DelProjectReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/project`, req, options)
}

/**
 * @description "获取项目列表 基础API"
 * @param params
 */
export function getProjectList(params: components.GetProjectListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project/list`, params, options)
}

/**
 * @description "获取项目枚举列表 基础API"
 * @param req
 */
export function getProjectEnums(req: components.GetProjectEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project/enums`, req, options)
}

/**
 * @description "获取项目详细列表"
 * @param params
 */
export function projectDetails(params: components.GetProjectListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project/projectDetails`, params, options)
}

/**
 * @description "获取项目详细"
 * @param params
 */
export function projectDetail(params: components.ProjectDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project/projectDetail`, params, options)
}

/**
 * @description "获取项目树形枚举数据 []TreeOptions"
 */
export function projectTreeOptions(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/project/projectTreeOptions`, null, options)
}

/**
 * @description "添加用户名单 基础API"
 * @param req
 */
export function addUser(req: components.AddUserReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/user`, req, options)
}

/**
 * @description "更新用户名单 基础API"
 * @param req
 */
export function putUser(req: components.PutUserReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/user`, req, options)
}

/**
 * @description "获取用户名单 基础API"
 * @param req
 */
export function getUser(req: components.GetUserReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/user`, req, options)
}

/**
 * @description "删除用户名单 基础API"
 * @param req
 */
export function delUser(req: components.DelUserReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/user`, req, options)
}

/**
 * @description "获取用户名单列表 基础API"
 * @param params
 */
export function getUserList(params: components.GetUserListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/user/list`, params, options)
}

/**
 * @description "获取用户名单枚举列表 基础API"
 * @param req
 */
export function getUserEnums(req: components.GetUserEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/user/enums`, req, options)
}

/**
 * @description "获取用户详情"
 * @param params
 */
export function userDetail(params: components.UserDetailReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/user/detail`, params, options)
}

/**
 * @description "获取用户详情列表"
 * @param params
 */
export function userDetails(params: components.GetUserListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/user/details`, params, options)
}

/**
 * @description "添加活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理 基础API"
 * @param req
 */
export function addUserPool(req: components.AddUserPoolReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/luckydraw/userPool`, req, options)
}

/**
 * @description "更新活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理 基础API"
 * @param req
 */
export function putUserPool(req: components.PutUserPoolReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/luckydraw/userPool`, req, options)
}

/**
 * @description "获取活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理 基础API"
 * @param req
 */
export function getUserPool(req: components.GetUserPoolReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/userPool`, req, options)
}

/**
 * @description "删除活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理 基础API"
 * @param req
 */
export function delUserPool(req: components.DelUserPoolReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/luckydraw/userPool`, req, options)
}

/**
 * @description "获取活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理列表 基础API"
 * @param params
 */
export function getUserPoolList(params: components.GetUserPoolListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/userPool/list`, params, options)
}

/**
 * @description "获取活动用户池，可以参与该活动抽奖的用户，及其在该活动中的积分管理枚举列表 基础API"
 * @param req
 */
export function getUserPoolEnums(req: components.GetUserPoolEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/luckydraw/userPool/enums`, req, options)
}
