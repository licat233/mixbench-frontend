import { FC, useRef, useState } from 'react';
import { ModalForm, ProFormDigit, ProFormInstance, ProFormSelect, ProFormItem } from '@ant-design/pro-components';
import { Enum, Prize, getPrize, getPrizeEnums, getPrizeGradeEnums, PrizePool } from '@/services/swagger/luckydraw';
import styles from '../style.less';
import { message } from 'antd';
import { PrizeDetailInfo } from '../data';

type PrizePoolModalProps = {
    done: boolean;
    open: boolean;
    current: Partial<PrizeDetailInfo> | undefined;
    onDone: () => void;
    onSubmit: (values: PrizePool) => Promise<boolean>;
}

const PrizePoolModal: FC<PrizePoolModalProps> = (props) => {
    const { done, open: visible, current, onDone, onSubmit } = props;
    const formRef = useRef<ProFormInstance>();
    const record = current?.prizePool;
    const activity = current?.activity;
    const [prizeImg, setPrizeImg] = useState<string>("");
    const httpCache = useRef<Record<number, Prize>>({})
    const onDoneHandler = () => {
        if (prizeImg !== "") setPrizeImg("");
        onDone()
    }
    return (
        <ModalForm<PrizePool>
            onOpenChange={(visible: boolean) => {
                if (visible) {
                    setPrizeImg(current?.image || "");
                } else {
                    setPrizeImg("");
                }
            }}
            open={visible}
            title={done ? null : `${current?.activity?.name}活动-奖品${record ? '编辑' : '添加'}`}
            className={styles.standardListForm}
            width={375}
            onFinish={async (values) => {
                if (!activity?.id) {
                    message.error("获取不到当前活动id")
                    return
                }
                const ok = await onSubmit({ ...record, ...values, activityId: activity?.id });
                if (ok) onDoneHandler();
            }}
            initialValues={{ luckValue: 100, status: 1, total: 1, remainder: 1, ...record }}
            submitter={{
                render: (_, dom) => (done ? null : dom),
            }}
            // trigger={<>{children}</>}
            modalProps={{
                onCancel: onDoneHandler,
                destroyOnClose: true,
                bodyStyle: done ? { padding: '72px 0' } : {},
            }}
            formRef={formRef}
        >
            <ProFormItem valueType="image" label="奖品图片" name="image">
                <div className={styles.prizeImage}>
                    <img src={prizeImg} />
                </div>
            </ProFormItem>
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                placeholder="请选择奖品"
                request={async () => (await getPrizeEnums({})).data as Enum[]}
                width="md"
                name="prizeId"
                label='奖品'
                fieldProps={{
                    onChange: async (prizeId: number) => {
                        if (Object.prototype.toString.call(prizeId) !== '[object Number]') return setPrizeImg("");
                        if (httpCache.current[prizeId]) {
                            setPrizeImg(httpCache.current[prizeId].image);
                            return
                        }
                        const { data } = await getPrize({
                            id: prizeId
                        })
                        if (!data) return setPrizeImg("");
                        const prize = data as Prize
                        let url: string = prize?.image || "";
                        setPrizeImg(url);
                        httpCache.current[prizeId] = prize;
                    }
                }}
            />
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                placeholder="请选择奖品级别"
                request={async () => (await getPrizeGradeEnums({})).data as Enum[]}
                width="md"
                name="gradeId"
                label='奖品级别'
            />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: '请填写数字',
                    },
                ]}
                width="md"
                name="luckValue"
                label='幸运值'
            />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: '请填写数字',
                    },
                ]}
                width="md"
                name="total"
                label='总数量'
            />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: '请填写数字',
                    },
                ]}
                width="md"
                name="remainder"
                label='剩余数量'
            />
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                options={[{ label: "启用", value: 1 }, { label: "禁用", value: 0 }]}
                width="md"
                name="status"
                label='奖品状态'
            />
        </ModalForm>
    );
}

export default PrizePoolModal;
