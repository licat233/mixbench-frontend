import { FC, useRef, useState } from 'react';
import { getActivityEnums, Enum, getProjectEnums, UserPool } from '@/services/swagger/luckydraw';
import styles from '../style.less';
import { message } from 'antd';
import { ActivityDetailInfo } from '../data';
import { DefaultOptionType } from 'antd/lib/select';
import { ModalForm, ProFormSelect, ProFormDigit, ProFormInstance } from '@ant-design/pro-components';

type UserPoolModalProps = {
    done: boolean;
    open: boolean;
    current: Partial<ActivityDetailInfo> | undefined;
    onDone: () => void;
    onSubmit: (values: UserPool) => Promise<boolean>;
}

const UserPoolModal: FC<UserPoolModalProps> = (props) => {
    const { done, open, current, onDone, onSubmit } = props;
    const formRef = useRef<ProFormInstance>();
    const user = current?.user;
    const userPool = current?.userPool;
    const activity = current?.activity;

    // const [projectId, setProjectId] = useState<number | undefined>(activity?.projectId)
    const [activityOptions, setActivityOptions] = useState<DefaultOptionType[]>([])
    const activityOptionsMark = useRef(0);  //http请求标记，防止异步冲突

    const activityEnumCache = useRef<Map<number, DefaultOptionType[]>>(new Map())
    const RequestActivityOptionsList = async (projectId: number | undefined): Promise<DefaultOptionType[]> => {
        if (typeof projectId === 'undefined' || projectId === undefined) return [];
        if (activityEnumCache.current.has(projectId)) return activityEnumCache.current.get(projectId) || [];
        try {
            const res = await (await getActivityEnums({ parentId: projectId })).data as Enum[]
            activityEnumCache.current.set(projectId, res)
            return res
        } catch (error: any) {
            message.error(error.message)
        }
        return []
    }

    const onDoneHandler = () => {
        onDone()
        setActivityOptions([])
    }

    return (
        <ModalForm<UserPool>
            open={open}
            title={done ? null : `用户${current?.user?.name}-参与活动${userPool ? '编辑' : '添加'}`}
            className={styles.standardListForm}
            width={375}
            onFinish={async (values) => {
                if (!user?.id) {
                    message.error("获取不到当前用户id")
                    return
                }
                const ok = await onSubmit({ ...userPool, ...values, userId: user?.id });
                if (ok) onDoneHandler();
            }}
            initialValues={{ status: 1, score: 0, ...userPool }}
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

            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                width="md"
                name="projectId"
                label='项目'
                initialValue={activity?.projectId}
                request={async()=>(await getProjectEnums({})).data as Enum[]}
                fieldProps={{
                    onChange: async (val: number) => {
                        const markTimestamp = new Date().valueOf()
                        activityOptionsMark.current = markTimestamp
                        const markNumber = markTimestamp
                        const res = await RequestActivityOptionsList(val)
                        if (markNumber === activityOptionsMark.current) { //表示是最新请求
                            setActivityOptions(res) //更新活动选项
                            formRef.current?.setFieldValue("activityId", undefined)
                        }
                    },
                }}
            />
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                placeholder="请选择活动"
                options={activityOptions}
                width="md"
                name="activityId"
                label='活动'
            />
            <ProFormDigit
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                width="md"
                name="score"
                label='积分'
            />
            <ProFormSelect
                rules={[
                    {
                        required: true,
                        message: '必填项',
                    },
                ]}
                options={[{ label: "允许", value: 1 }, { label: "禁止", value: 0 }]}
                width="md"
                name="status"
                label='状态'
            />
        </ModalForm>
    );
}

export default UserPoolModal;
