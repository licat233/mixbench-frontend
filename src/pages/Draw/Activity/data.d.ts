import { Activity } from '@/services/swagger/admin-custom';
import { PrizePool } from "@/services/swagger/adminComponents";

export type PrizeDetailInfo = {
    index: number;
    id: number;  //奖品id
    uuid: string;
    key: number | string;
    name: string; //奖品名
    image: string; //图片
    price: number; //价格
    grade: string; //级别
    chance: string; //概率
    luckValue: number; //幸运值
    total: number; //总数量
    status: number; //状态
    remainder: number; //剩余数量
    prizePool: PrizePool;
    activity: Activity; //活动id
}
