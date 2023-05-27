/*
 * @Author: licat
 * @Date: 2022-12-29 16:58:32
 * @LastEditors: licat
 * @LastEditTime: 2022-12-29 17:17:55
 * @Description:
 */
export type LuckyFormData = {
  id: number // 表主键
  uuid: string // 唯一识别码
  userId: number // 中奖用户id
  prizePoolId: number // 抽中的奖品池id
  status: number // 状态: -1放弃领奖，0未领奖，1已领奖
  luckDate: number // 抽奖时间
  // ip: string // ip地址

  projectId: number
  activityId: number
  prizeId: number
  prizeGrade: number
};

export type ReqStorage = {
  activity: Record<number, DefaultOptionType[]>,
  prize: Record<number, DefaultOptionType[]>,
}
