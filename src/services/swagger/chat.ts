import webapi from "./webapi"
import type * as components from "./chatComponents"
export * from "./chatComponents"

/**
 * @description "游客登录"
 */
export function visitorLogin(options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/public/visitorLogin`, null, options)
}

/**
 * @description "测试"
 * @param req
 */
export function test(req: components.TestReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/public/test`, req, options)
}

/**
 * @description "visitor游客获取自己的聊天记录"
 */
export function visitorMessages(options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/public/visitor/messages`, null, options)
}

/**
 * @description "visitor建立ws连接"
 * @param params
 */
export function visitorServer(params: components.ConnWebsocketReqParams, options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/chat/public/ws/visitor`, params, options)
}

/**
 * @description "kefu建立ws连接"
 * @param params
 */
export function kefuServer(params: components.ConnWebsocketReqParams, options?: Record<string, any>) {
	return webapi.get<null>(`/v1/api/chat/public/ws/kefu`, params, options)
}

/**
 * @description "保存消息配置"
 * @param req
 */
export function saveMsgConf(req: components.SaveMsgConfReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/saveMsgConf`, req, options)
}

/**
 * @description "获取某客服的游客列表"
 * @param params
 */
export function visitorList(params: components.VisitorListReqParams, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/visitorList`, params, options)
}

/**
 * @description "将游客转接给其他客服"
 * @param req
 */
export function transferVisitor(req: components.TransferVisitorReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/transferVisitor`, req, options)
}

/**
 * @description "获取某个游客的最后一条消息"
 * @param req
 */
export function visitorLastMessage(req: components.VisitorLastMessageReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/visitorLastMessage`, req, options)
}

/**
 * @description "获取某个游客的全部消息"
 * @param req
 */
export function getVisitorMessages(req: components.GetVisitorMessagesReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/visitorMessages`, req, options)
}

/**
 * @description "更改某个游客的备注"
 * @param req
 */
export function putVisitorComment(req: components.PutVisitorCommentReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/putVisitorComment`, req, options)
}

/**
 * @description "添加消息 基础API"
 * @param req
 */
export function addMessage(req: components.AddMessageReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/message`, req, options)
}

/**
 * @description "更新消息 基础API"
 * @param req
 */
export function putMessage(req: components.PutMessageReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/chat/message`, req, options)
}

/**
 * @description "获取消息 基础API"
 * @param req
 */
export function getMessage(req: components.GetMessageReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/message`, req, options)
}

/**
 * @description "删除消息 基础API"
 * @param req
 */
export function delMessage(req: components.DelMessageReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/chat/message`, req, options)
}

/**
 * @description "获取消息列表 基础API"
 * @param params
 */
export function getMessageList(params: components.GetMessageListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/message/list`, params, options)
}

/**
 * @description "获取消息枚举列表 基础API"
 * @param req
 */
export function getMessageEnums(req: components.GetMessageEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/message/enums`, req, options)
}

/**
 * @description "添加消息配置 基础API"
 * @param req
 */
export function addMessageConfig(req: components.AddMessageConfigReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/messageConfig`, req, options)
}

/**
 * @description "更新消息配置 基础API"
 * @param req
 */
export function putMessageConfig(req: components.PutMessageConfigReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/chat/messageConfig`, req, options)
}

/**
 * @description "获取消息配置 基础API"
 * @param req
 */
export function getMessageConfig(req: components.GetMessageConfigReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/messageConfig`, req, options)
}

/**
 * @description "删除消息配置 基础API"
 * @param req
 */
export function delMessageConfig(req: components.DelMessageConfigReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/chat/messageConfig`, req, options)
}

/**
 * @description "获取消息配置列表 基础API"
 * @param params
 */
export function getMessageConfigList(params: components.GetMessageConfigListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/messageConfig/list`, params, options)
}

/**
 * @description "获取消息配置枚举列表 基础API"
 * @param req
 */
export function getMessageConfigEnums(req: components.GetMessageConfigEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/messageConfig/enums`, req, options)
}

/**
 * @description "添加游客 基础API"
 * @param req
 */
export function addVisitor(req: components.AddVisitorReq, options?: Record<string, any>) {
	return webapi.post<components.BaseResp>(`/v1/api/chat/visitor`, req, options)
}

/**
 * @description "更新游客 基础API"
 * @param req
 */
export function putVisitor(req: components.PutVisitorReq, options?: Record<string, any>) {
	return webapi.put<components.BaseResp>(`/v1/api/chat/visitor`, req, options)
}

/**
 * @description "获取游客 基础API"
 * @param req
 */
export function getVisitor(req: components.GetVisitorReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/visitor`, req, options)
}

/**
 * @description "删除游客 基础API"
 * @param req
 */
export function delVisitor(req: components.DelVisitorReq, options?: Record<string, any>) {
	return webapi.delete<components.BaseResp>(`/v1/api/chat/visitor`, req, options)
}

/**
 * @description "获取游客列表 基础API"
 * @param params
 */
export function getVisitorList(params: components.GetVisitorListReqParams, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/visitor/list`, params, options)
}

/**
 * @description "获取游客枚举列表 基础API"
 * @param req
 */
export function getVisitorEnums(req: components.GetVisitorEnumsReq, options?: Record<string, any>) {
	return webapi.get<components.BaseResp>(`/v1/api/chat/visitor/enums`, req, options)
}
