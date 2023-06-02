/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useRef, useState } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormText,
  ProFormDigit,
} from '@ant-design/pro-components';
import styles from '../style.less';
import { Activity, ActivityPrize, Enum, LuckyDetail, projectActivities, getProjectEnums, PutLuckyReq, getActivityPrizes } from '@/services/swagger/luckydraw';
import { message } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { LuckyFormData, ReqStorage } from '../data';
import dayjs from 'dayjs';

type OperationModalProps = {
  done: boolean;
  open: boolean;
  // current: Partial<lucky> | undefined;
  details: Partial<LuckyDetail> | undefined;
  onDone: () => void;
  onSubmit: (values: PutLuckyReq) => Promise<boolean>;
};


const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, open, details, onDone, onSubmit } = props;

  /**
   * 先选择项目，获取活动
   * 编辑模式：中奖用户暂时不可更改
   */

  const activityOptionsMark = useRef(0);
  const prizeOptionsMark = useRef(0);
  const [projectId, setProjectId] = useState<number | undefined>(details?.project?.id)
  const [activityId, setActivityId] = useState<number | undefined>(details?.activity?.id)

  const [activityOptions, setActivityOptions] = useState<DefaultOptionType[]>()
  const [prizeOptions, setPrizeOptions] = useState<DefaultOptionType[]>()

  const formRef = useRef<ProFormInstance>();

  const httpStore = useRef<ReqStorage>({
    activity: {},
    prize: {},
  })

  const RequestActivityOptionsList = async (projectId: number | undefined): Promise<DefaultOptionType[]> => {
    if (typeof projectId === 'undefined') return [];
    if (httpStore.current.activity[projectId]) return httpStore.current.activity[projectId]
    try {
      const res = await projectActivities({ projectId })
      if (res.success && res.data) {
        const list = (res.data as Activity[]).map<DefaultOptionType>(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        httpStore.current.activity[projectId] = list
        return list
      }
    } catch (error: any) {
      message.error(error.message)
    }
    return []
  }

  const CalculatePercentage = (total: number, num: number): string => (num * 100 / total).toFixed(2) + "%"

  const RequestPrizeOptionsList = async (activityId: number | undefined): Promise<DefaultOptionType[]> => {
    if (typeof activityId === 'undefined') return [];
    if (httpStore.current.prize[activityId]) return httpStore.current.prize[activityId]
    try {
      const res = await getActivityPrizes({ activityId })
      if (res.success && res.data) {
        const totalLuckValue = (res.data as Array<ActivityPrize>).reduce((total, item: ActivityPrize) => {
          return total + item.prizePool.luckValue
        }, 0)
        const list = (res.data as Array<ActivityPrize>).map<DefaultOptionType>(item => {
          return {
            label: `${item.prize.name}【${item.prizeGrade.name}】-概率${CalculatePercentage(totalLuckValue, item.prizePool.luckValue)}`,
            value: item.prizePool.id
          }
        })
        httpStore.current.prize[activityId] = list
        return list
      }
    } catch (error: any) {
      message.error(error.message)
    }
    httpStore.current.prize[activityId] = []
    return []
  }

  const initActivityOptionsState = useRef<boolean>(false)
  const initActivityOptions = async () => {
    if (initActivityOptionsState.current) return
    initActivityOptionsState.current = true
    const res = await RequestActivityOptionsList(projectId)
    setActivityOptions(res)
    initActivityOptionsState.current = false
  }

  const initPrizeOptionsState = useRef<boolean>(false)
  const initPrizeOptions = async () => {
    if (initPrizeOptionsState.current) return
    initPrizeOptionsState.current = true
    const res = await RequestPrizeOptionsList(activityId)
    setPrizeOptions(res)
    initPrizeOptionsState.current = false
  }

  useEffect(() => {
    if (typeof activityOptions === "undefined") {
      initActivityOptions()
    }
    if (typeof prizeOptions === "undefined") {
      initPrizeOptions()
    }
  }, [activityOptions, prizeOptions])

  //避免频繁的请求数据，做一个仓储
  // const storage: ReqStorage = {
  //   activity: {},
  //   prize: {},
  // }

  const currentFormData: Partial<LuckyFormData> = {
    projectId: details?.project?.id,
    activityId: details?.activity?.id,
    prizeId: details?.prize?.id,
    prizeGrade: details?.prizeGrade?.id,
    userId: details?.user?.id,
    ...details?.lucky,
  }

  if (currentFormData.luckDate) {
    currentFormData.luckDate = currentFormData.luckDate * 1000
  }

  return (
    <ModalForm<PutLuckyReq>
      open={open}
      title={done ? null : `抽奖单${details?.lucky ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={375}
      onFinish={async (values) => {
        values.luckDate = dayjs(values.luckDate).unix()
        const params: PutLuckyReq = {
          id: values.id,
          uuid: values.uuid,
          userId: values.userId,
          prizePoolId: values.prizePoolId,
          status: values.status,
          luckDate: values.luckDate,
          ip: values.ip || "",
        }
        const ok = await onSubmit(params);
        if (ok) onDone();
      }}
      initialValues={currentFormData}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      // trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
      formRef={formRef}
    // onValuesChange={(values, putReq)=>{
    //   console.log(values) //适用于实时编辑更新
    // }}
    >
      <ProFormDigit
        name="id"
        hidden={true}
      />
      <ProFormText
        name="uuid"
        hidden={true}
      />
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        width="md"
        name="userId"
        label='中奖用户'
        disabled={true}
        options={[
          {
            label: details?.user?.name,
            value: details?.lucky?.userId
          },
        ]}
      />
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        width="md"
        name="projectId"
        label='中奖项目'
        request={async () => (await getProjectEnums({})).data as Enum[]}
        fieldProps={{
          onChange: async (val: number) => {
            activityOptionsMark.current = new Date().valueOf()
            const markNumber = activityOptionsMark.current
            const res = await RequestActivityOptionsList(val)
            if (markNumber === activityOptionsMark.current) { //表示是最新请求
              setProjectId(val) //更新项目id
              setActivityOptions(res) //更新活动选项
              setActivityId(undefined) //重置活动id
              setPrizeOptions(undefined) //重置产品选项
              formRef.current?.setFieldValue("activityId", undefined)
              formRef.current?.setFieldValue("prizePoolId", undefined)
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
        width="md"
        name="activityId"
        label='中奖活动'
        options={activityOptions || []}
        fieldProps={{
          onChange: async (val: number) => {
            prizeOptionsMark.current = new Date().valueOf()
            const markNumber = prizeOptionsMark.current
            const res = await RequestPrizeOptionsList(val)
            if (markNumber === prizeOptionsMark.current) { //表示是最新请求
              setPrizeOptions(res) //更新产品选项
              formRef.current?.setFieldValue("prizePoolId", undefined)
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
        width="md"
        name="prizePoolId"
        label='中奖产品'
        options={prizeOptions || []}
      />
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        options={[{ label: "未领", value: 0 }, { label: "已领", value: 1 }, { label: "弃领", value: -1 }]}
        width="md"
        name="status"
        label='抽奖单状态'
      />

      <ProFormDateTimePicker
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
        width="md"
        name="luckDate"
        label="抽奖时间"
      />
      <ProFormText
        rules={[
          {
            pattern: /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/,
            message: 'ip格式有误',
          },
        ]}
        name="ip"
        width="md"
        label="IP地址"
      />
    </ModalForm>
  );
};

export default OperationModal;
