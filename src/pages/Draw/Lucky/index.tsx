import { DeleteTwoTone, DownOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProDescriptions, ProDescriptionsItemProps, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Dropdown, Modal, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getActivityPrizes, delLucky as del, addLucky as add, luckyDetails as list, putLucky as put, getPrizeGradeEnums, projectActivities, getProjectEnums } from '@/services/swagger/luckydraw';
import type { LuckyDetail, PutLuckyReq as PutReq, AddLuckyReq as AddReq, Lucky, User, Prize, Activity, Project, LuckyDetailsReq as Params, ActivityPrize, Enum } from "@/services/swagger/luckydrawComponents";
import OperationModal from './components/OperationModal';
import dayjs from 'dayjs';
import { ReqStorage } from './data';

const CalculatePercentage = (totalLuckValue: number, luckValue: number): string => {
  return (luckValue * 100 / totalLuckValue).toFixed(2) + "%"
}

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param record
 */

const handleAdd = async (record: AddReq) => {
  const hide = message.loading('正在添加');

  try {
    await add(record);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param record
 */

const handleUpdate = async (record: PutReq) => {
  const hide = message.loading('更新中...');
  try {
    await put(record);
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param id
 */

const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除...');
  if (typeof id === 'undefined') return true;

  try {
    await del({ id });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return "~"
  return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
}

const luckyStatusEnum: Record<number, Record<'text' | 'status', string>> = {
  "0": {
    text: '未领',
    status: 'Processing',
  },
  "1": {
    text: '已领',
    status: 'Success',
  },
  "-1": {
    text: '弃领',
    status: 'Default',
  },
}

// type LuckyInfo = {
//   userName: string //中奖人名称
//   prizeName: string //奖品名称
//   prizeGradeName: string //奖品级别
//   activityName: string //活动名称
//   projectName: string //项目名称
//   luckDate: number //中奖时间
//   lucky_status: number //状态
//   luckyIp: string //ip
//   lucky: Lucky
// }

const prizeColumns: ProColumns<Prize>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    valueType: 'digit',
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    valueType: 'text',
  },
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '图片',
    dataIndex: 'image',
    valueType: 'image',
  },
  {
    title: '价格',
    dataIndex: 'price',
    valueType: 'money',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '无货',
        status: 'Default',
      },
      1: {
        text: '有货',
        status: 'Success',
      },
    },
  }
]


const activityColumns: ProColumns<Activity>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    valueType: 'digit',
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    valueType: 'text',
  },
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '所属项目',
    dataIndex: "projectId",
    valueType: 'select',
    request: async () => (await getProjectEnums({})).data as Enum[],
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '开启',
        status: 'Success',
      },
    },
  },
  {
    title: '参与权限',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '客户',
        status: 'Default',
      },
      1: {
        text: '所有人',
        status: 'Success',
      },
    },
  },
  {
    title: '每人最大抽奖数',
    dataIndex: 'maxCount',
    render: (_, record) => {
      if (record.maxCount === -1) {
        return "无限制"
      }
      return record.maxCount + ' 次';
    },
  },
  {
    title: '每人最大获奖数',
    dataIndex: 'maxPrizes',
    render: (_, record) => {
      if (record.maxPrizes === -1) {
        return "无限制"
      }
      return record.maxPrizes + ' 次';
    },
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    valueType: 'dateTime',
    fieldProps: {
      format: 'DD.MM.YYYY HH:mm:ss',
    },
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'dateTime',
    fieldProps: {
      format: 'DD.MM.YYYY HH:mm:ss',
    },
  },
]

const projectColumns: ProColumns<Project>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    valueType: 'digit',
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    valueType: 'text',
  },
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '开启',
        status: 'Success',
      },
    },
  },
]


const userColumns: ProColumns<User>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    valueType: 'digit',
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    valueType: 'text',
  },
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '账号',
    dataIndex: 'passport',
    valueType: 'text',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    valueType: 'text',
  },
  {
    title: '地址',
    dataIndex: 'address',
    valueType: 'text',
  },
  {
    title: '积分',
    dataIndex: 'score',
    valueType: 'digit',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '正常',
        status: 'Success',
      },
      2: {
        text: '审核中',
        status: 'Error',
      },
    },
  }
];

const LuckyList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  // const [current, setCurrent] = useState<LuckyDetails>();
  const [currentDetail, setCurrentDetail] = useState<LuckyDetail>();
  const [currentDesc, setCurrentDesc] = useState<User | Prize | Activity | Project>();
  const [currentColumns, setCurrentColumns] = useState<ProColumns<LuckyDetail>[] | ProColumns<User>[] | ProColumns<Prize>[] | ProColumns<Activity>[] | ProColumns<Project>[]>();

  const [prizeGradeEnum, setPrizeGradeEnum] = useState<Enum[]>()
  const [projectEnum, setProjectEnum] = useState<Enum[]>()
  const prizeGradeEnumsStatus = useRef<boolean>(false)
  const projectEnumsStatus = useRef<boolean>(false)

  useEffect(() => {
    if (!prizeGradeEnum && !prizeGradeEnumsStatus.current) {
      prizeGradeEnumsStatus.current = true
      getPrizeGradeEnums({}).then((result) => {
        setPrizeGradeEnum(result.data as Enum[])
      })
    }
    if (!projectEnum && !projectEnumsStatus.current) {
      projectEnumsStatus.current = true
      getProjectEnums({}).then((result) => {
        setProjectEnum(result.data as Enum[])
      })
    }
  })

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  let activityOptionsMark = useRef(0);
  let prizeOptionsMark = useRef(0);
  const [activityOptions, setActivityOptions] = useState<Enum[]>()
  const [prizeOptions, setPrizeOptions] = useState<Enum[]>()

  const formRef = useRef<ProFormInstance>();

  const httpStore = useRef<ReqStorage>({
    activity: {},
    prize: {},
  })

  const showEditModal = (item: Lucky, detail: LuckyDetail) => {
    setVisible(true);
    // setCurrent(details);
    setCurrentDetail(detail);
  };

  const editAndDelete = (key: string | number, currentItem: Lucky, detail: LuckyDetail) => {
    if (key === 'edit') {
      showEditModal(currentItem, detail);
    }
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除警告',
        content: '确定删除该奖品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const ok = await handleRemove(currentItem.id)
          //刷新列表
          if (actionRef.current && ok) {
            actionRef.current.reload();
          }
        },
      });
    }
  };

  const RequestActivityOptionsList = async (projectId: number | undefined): Promise<Enum[]> => {
    if (typeof projectId === 'undefined') return [];
    if (httpStore.current.activity[projectId]) return httpStore.current.activity[projectId]
    try {
      const res = await projectActivities({ projectId })
      if (res.success && res.data) {
        const list = (res.data as Activity[]).map<Enum>(item => {
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
    httpStore.current.activity[projectId] = []
    return []
  }

  const RequestPrizeOptionsList = async (activityId: number | undefined): Promise<Enum[]> => {
    if (typeof activityId === 'undefined') return [];
    if (httpStore.current.prize[activityId]) return httpStore.current.prize[activityId]
    try {
      const res = await getActivityPrizes({ activityId });
      if (res.success && res.data) {
        const totalLuckValue = (res.data as Array<ActivityPrize>).reduce((total, item: ActivityPrize) => {
          return total + item.prizePool.luckValue
        }, 0)
        const list = (res.data as Array<ActivityPrize>).map<Enum>(item => {
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

  const [activityIndex, setActivityIndex] = useState<"activityName" | "activityId">("activityName")
  const [activityType, setActivityType] = useState<"text" | "select">("text")

  const [prizeIndex, setPrizeIndex] = useState<"prizeName" | "prizeId">("prizeName")
  const [prizeType, setPrizeType] = useState<"text" | "select">("text")

  const operationList = [
    {
      key: 'edit',
      itemIcon: <EditTwoTone twoToneColor='#245cfc'></EditTwoTone>,
      label: '编辑'
    },
    {
      key: 'delete',
      itemIcon: <DeleteTwoTone twoToneColor='#ce2e3f'></DeleteTwoTone>,
      danger: true,
      label: '删除',
    },
  ]

  const MoreBtn: React.FC<{
    item: Lucky;
    detail: LuckyDetail;
  }> = ({ item, detail }) => (
    <Dropdown
      menu={{
        onClick: ({ key }) => editAndDelete(key, item, detail),
        items: operationList
      }}
    >
      <a href="#!" onClick={(e) => { e.preventDefault() }}>
        操作 <DownOutlined />
      </a>
    </Dropdown>
  );

  const columns: ProColumns<LuckyDetail>[] = [
    {
      title: '用户名',
      dataIndex: "userName",
      key: "userName",
      valueType: 'text',
      render: (_, record) => {
        if (!record.user) {
          return "-";
        }
        return (
          <a
            href="#!"
            onClick={() => {
              setCurrentDesc(record.user)
              setCurrentColumns(userColumns)
              setShowDetail(true);
            }}
          >
            {record.user.name}
          </a>
        );
      }
    },
    {
      title: '项目',
      dataIndex: "projectId",
      key: "projectId",
      valueType: 'select',
      render: (_, record) => {
        if (!record.project) {
          return "-";
        }
        return (
          <a
            href="#!"
            onClick={() => {
              setCurrentDesc(record.project)
              setCurrentColumns(projectColumns)
              setShowDetail(true);
            }}
          >
            {record.project.name}
          </a>
        );
      },
      fieldProps: {
        options: projectEnum || [],
        onChange: async (val: number | undefined) => {
          if (Object.prototype.toString.call(val) !== '[object Number]') {
            formRef.current?.setFieldValue("activityId", undefined)
            formRef.current?.setFieldValue("prizeId", undefined)
            setActivityIndex("activityName")
            setActivityType("text")
            setPrizeIndex("prizeName")
            setPrizeType("text")
            return
          }
          activityOptionsMark.current = new Date().valueOf()
          const markNumber = activityOptionsMark.current
          const res = await RequestActivityOptionsList(val)
          if (markNumber === activityOptionsMark.current) { //表示是最新请求
            setActivityOptions(res) //更新活动选项
            setPrizeOptions(undefined) //重置产品选项
            formRef.current?.setFieldValue("activityId", undefined)
            formRef.current?.setFieldValue("prizeId", undefined)
            setActivityIndex("activityId")
            setActivityType("select")
            setPrizeIndex("prizeName")
            setPrizeType("text")
            // console.log(formRef.current?.getFieldValue("activityId"))
          }
        },
      },
    },
    {
      title: '活动',
      dataIndex: activityIndex,
      valueType: activityType,
      // request: activityEnumListRequest,
      render: (_, record) => {
        if (!record.activity) {
          return "-";
        }
        return (
          <a
            href="#!"
            onClick={() => {
              setCurrentDesc(record.activity)
              setCurrentColumns(activityColumns)
              setShowDetail(true);
            }}
          >
            {record.activity.name}
          </a>
        );
      },
      fieldProps: {
        options: activityOptions || [],
        onChange: async (val: number | undefined) => {
          if (Object.prototype.toString.call(val) !== '[object Number]') {
            formRef.current?.setFieldValue("prizeId", undefined) //重置产品选项
            setPrizeIndex("prizeName")
            setPrizeType("text")
            return
          }
          prizeOptionsMark.current = new Date().valueOf()
          const markNumber = prizeOptionsMark.current
          const res = await RequestPrizeOptionsList(val)
          if (markNumber === prizeOptionsMark.current) { //表示是最新请求
            setPrizeOptions(res) //更新产品选项
            formRef.current?.setFieldValue("prizeId", undefined) //重置产品选项
            setPrizeIndex("prizeId")
            setPrizeType("select")
          }
        },
      }
    },
    {
      title: '奖品',
      dataIndex: prizeIndex,
      valueType: prizeType,
      fieldProps: {
        options: prizeOptions || [],
      },
      render: (_, record) => {
        if (!record.prize) {
          return "-";
        }
        return (
          <a
            href="#!"
            onClick={() => {
              setCurrentDesc(record.prize)
              setCurrentColumns(prizeColumns)
              setShowDetail(true);
            }}
          >
            {record.prize.name}
          </a>
        );
      }
    },
    {
      title: '等级',
      dataIndex: "prizeGradeId",
      valueType: 'select',
      render: (_, record) => {
        if (!record.prizeGrade) {
          return "-";
        }
        return record.prizeGrade.name
      },
      fieldProps: {
        options: prizeGradeEnum || [],
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      valueType: 'select',
      valueEnum: luckyStatusEnum,
      render: (_, record) => luckyStatusEnum[record.lucky.status]?.text || "",
    },
    {
      title: '抽奖时间',
      dataIndex: 'luckDate',
      valueType: 'date',
      render: (_, record) => {
        return formatDate(record.lucky.luckDate);
      },
    },
    {
      title: 'IP',
      dataIndex: "ip",
      valueType: 'text',
      render: (_, record) => {
        return record.lucky.ip;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => [
        <MoreBtn key="more" item={record.lucky} detail={record} />,
      ],
    },
  ];

  const renderDescription = function <Type extends Record<string, any>>(entity: Type, cloumn: ProColumns<LuckyDetail>[] | ProColumns<User>[] | ProColumns<Prize>[] | ProColumns<Activity>[] | ProColumns<Project>[] | undefined): JSX.Element {
    return (
      <ProDescriptions<Type>
        column={2}
        title={entity?.name}
        request={async () => ({
          data: entity || {},
        })}
        params={{
          id: entity?.id,
        }}
        columns={cloumn as ProDescriptionsItemProps<Type>[]}
      />
    )
  }

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    // setCurrent(undefined);
    setCurrentDetail(undefined);
  };

  const handleSubmit = async (record: PutReq): Promise<boolean> => {
    const method = record.id ? 'update' : 'add';
    let ok = false
    if (method === 'update') {
      ok = await handleUpdate(record)
    } else if (method === 'add') {
      ok = await handleAdd(record)
    }
    setDone(ok);
    //刷新列表
    if (actionRef.current && ok) {
      actionRef.current.reload();
    }
    return ok
  };

  return (
    <PageContainer>
      <ProTable<LuckyDetail, Params>
        headerTitle={'奖品列表'}
        actionRef={actionRef}
        rowKey={(record) => {
          return record.lucky.id
        }}
        search={{

        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            hidden={true}
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={list}
        columns={columns}
        dateFormatter="number"
        formRef={formRef}
        onReset={() => {
          setActivityOptions(undefined)
          setPrizeOptions(undefined)
          setActivityIndex("activityName")
          setActivityType("text")
          setPrizeIndex("prizeName")
          setPrizeType("text")
        }}
      />
      <OperationModal
        done={done}
        open={visible}
        // current={current}
        details={currentDetail}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          // setCurrent(undefined);
          setShowDetail(false);
          // setCurrentDetails(undefined);
          setCurrentDesc(undefined);
        }}
        closable={false}
      >
        {currentDesc && currentColumns && renderDescription(currentDesc, currentColumns)}
      </Drawer>
    </PageContainer>
  );
};

//需要显示详情信息的字段：用户，奖品，活动，项目

export default LuckyList;
