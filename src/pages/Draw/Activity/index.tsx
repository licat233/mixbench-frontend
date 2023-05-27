import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProDescriptionsItemProps, PageContainer,  ProDescriptions, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { addActivity as add, delActivity as del, activityDetails, putActivity as put, addPrizePool, delPrizePool, putPrizePool, activityPatternEnumList, resetLuckValue, getProjectEnums } from '@/services/swagger/luckydraw';
import { Activity as Item, AddActivityReq as AddReq, PutActivityReq as PutReq, GetActivityListReqParams as Params, ActivityPrize, Activity, ActivityDetail, BaseResp, PrizePool, PutPrizePoolReq, AddPrizePoolReq, DelPrizePoolReq, Enum } from "@/services/swagger/luckydrawComponents";
import OperationModal from './components/OperationModal';
import { PrizeDetailInfo } from './data';
import PrizePoolModal from './components/PrizePoolModel';
import MoreActionBtn from '@/components/MoreBtn';

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
  if (typeof id === 'undefined') return true;
  const hide = message.loading('正在删除...');
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

const chanceCalculation = (total: number, item: number) => {
  const a = item * 100 / total
  return a.toFixed(2)
}

const ActivityList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Item>();

  const showEditModal = (item: Item) => {
    setVisible(true);
    setCurrent(item);
  };

  const delHandle = (id: number) => {
    Modal.confirm({
      title: '删除警告',
      content: '确定删除该活动吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const ok = await handleRemove(id)
        //刷新列表
        if (actionRef.current && ok) {
          actionRef.current.reload();
        }
      },
    });
  }

  const columns: ProColumns<Item>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'UUID',
      dataIndex: 'uuid',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      // tip: 'The activity uuid is the unique key',
      render: (dom, entity: Item) => {
        return (
          <a
            onClick={() => {
              setCurrent(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '所属项目',
      dataIndex: "projectId",
      valueType: 'select',
      request: async () => (await getProjectEnums({})).data as Enum[]
    },
    {
      title: '活动状态',
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
      title: '模式',
      dataIndex: 'pattern',
      valueType: 'select',
      request: async () => (await activityPatternEnumList()).data as Enum[]
    },
    {
      title: '每人最大抽奖数',
      dataIndex: 'maxCount',
      valueType: "digit",
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
      valueType: "digit",
      render: (_, record) => {
        if (record.maxPrizes === -1) {
          return "无限制"
        }
        return record.maxPrizes + ' 次';
      },
    },
    {
      title: '活动时间',
      valueType: 'dateTimeRange',
      dataIndex: "range_time",
      render: (_, record) => {
        if (!record.startTime || !record.endTime) {
          return "数据异常"
        }
        return formatDate(record.startTime) + " - " + formatDate(record.endTime);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => [
        <MoreActionBtn key="more" current={record} onEdit={(item) => { showEditModal(item); }} onDel={(id) => { delHandle(id) }} />,
      ],
    },
  ];

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent(undefined);
  };

  const handleSubmit = async (record: Item): Promise<boolean> => {
    const method = record?.id ? 'update' : 'add';
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

  /** 当前缓存策略存在的问题:
   * ①当分页较多时，会缓存全部分页内的数据，造成较大的内存开销，解决方案：每次调用list函数时，应该clear当前户缓存
   * ②应当使用Map结构存储
   * ③命名不够清晰，推荐：prizePoolCache
   */
  const prizePoolCache = useRef<Map<number, ActivityDetail>>(new Map())
  const list = async (req: Params): Promise<BaseResp> => {
    prizePoolCache.current.clear();
    const respData = await activityDetails(req)
    const list = respData.data ? respData.data as ActivityDetail[] : [];
    const res = list.map<Activity>(item => {
      prizePoolCache.current.set(item.activity.id, item);
      return item.activity
    })
    respData.data = res
    return respData
  }

  //children
  const [prizePoolModelVisible, setPrizePoolModelVisible] = useState<boolean>(false);
  const [prizePoolModelCurrent, setPrizePoolModelCurrent] = useState<PrizeDetailInfo>()
  const [prizePoolModelDone, setPrizePoolModelDone] = useState<boolean>(false)

  const prizePoolModelOnDone = () => {
    setPrizePoolModelDone(false);
    setPrizePoolModelVisible(false);
    setPrizePoolModelCurrent(undefined);
  }

  const handleUpdatePrizePool = async (req: PutPrizePoolReq) => {
    const hide = message.loading('更新中...');
    try {
      await putPrizePool(req);
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  }

  const handleAddPrizePool = async (req: AddPrizePoolReq) => {
    const hide = message.loading('正在添加');
    try {
      await addPrizePool(req);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败');
      return false;
    }
  }

  const handleDelPrizePool = async (req: DelPrizePoolReq) => {
    const del = async () => {
      const hide = message.loading('正在删除');
      try {
        await delPrizePool(req);
        hide();
        message.success('删除成功');
        //刷新列表
        actionRef.current?.reload();
        return true;
      } catch (error) {
        hide();
        message.error('删除失败');
        return false;
      }
    }
    Modal.confirm({
      title: '删除警告',
      content: '确定删除该活动的奖品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => del(),
    });
  }

  const prizePoolModelSubmit = async (record: PrizePool): Promise<boolean> => {
    const method = record?.id ? 'update' : 'add';
    let ok: boolean = false
    if (method === 'update') {
      ok = await handleUpdatePrizePool(record)
    } else if (method === 'add') {
      ok = await handleAddPrizePool(record)
    }
    setPrizePoolModelDone(ok);
    //刷新列表
    if (ok) actionRef.current?.reload();
    return ok
  }

  const showPrizePoolModal = (prizeinfo: PrizeDetailInfo | undefined) => {
    setPrizePoolModelCurrent(prizeinfo)
    setPrizePoolModelVisible(true);
  };

  const showAddPrizePoolModal = (activity: Activity) => {
    const pd: any = { activity }
    showPrizePoolModal(pd as unknown as PrizeDetailInfo)
  }

  const resetLuckValueHandle = async (activity: Activity) => {
    const func = async () => {
      try {
        await resetLuckValue({ activityId: activity.id, activityUuid: activity.uuid })
        actionRef.current?.reload();
      } catch (error) {
        message.error("重置失败")
      }
    }
    Modal.confirm({
      title: '敏感操作',
      content: '确定重置该活动所有奖品的概率吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => func(),
    });
  }

  const expandedRowRender = (activity: Item) => {
    if (!prizePoolCache.current.has(activity.id)) {
      message.error(`${activity.name}活动奖品数据丢失！`)
      return <></>
    }
    const cache = prizePoolCache.current.get(activity.id)?.activityPrizes;
    let totalChance = 0;
    cache?.forEach((currentItem: ActivityPrize) => {
      totalChance += currentItem.prizePool.luckValue;
    })

    const data = cache?.map<PrizeDetailInfo>((item: ActivityPrize, index: number) => {
      const chance = chanceCalculation(totalChance, item.prizePool.luckValue) + "%"
      return {
        index: index,
        id: item.prizePool.id,
        uuid: item.prizePool.uuid,
        key: index,
        name: item.prize.name,
        image: item.prize.image,
        price: item.prize.price,
        grade: item.prizeGrade.name,
        chance: chance,
        luckValue: item.prizePool.luckValue,
        total: item.prizePool.total,
        status: item.prizePool.status,
        remainder: item.prizePool.remainder,
        prizePool: item.prizePool,
        activity: activity
      }
    });
    return (
      <ProTable
        columns={[
          { title: '奖品名称', dataIndex: 'name', key: 'name', valueType: 'text' },
          { title: '图片', dataIndex: 'image', key: 'image', valueType: 'image' },
          { title: '价格', dataIndex: 'price', key: 'price', valueType: 'digit' },
          { title: '等级', dataIndex: 'grade', key: 'grade', valueType: 'text' },
          { title: '概率', dataIndex: 'chance', key: 'chance', valueType: 'text' },
          { title: '幸运值', dataIndex: 'luckValue', key: 'luckValue', valueType: 'digit' },
          { title: '数量', dataIndex: 'total', key: 'total', valueType: 'digit' },
          { title: '剩余', dataIndex: 'remainder', key: 'remainder', valueType: 'digit' },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              1: {
                text: '启用',
                status: 'Success',
              },
              0: {
                text: '禁用',
                status: 'Default',
              },
            },
          },
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            width: 80,
            render: (_: any, record: PrizeDetailInfo) => [
              <MoreActionBtn key="more" current={record}
                onEdit={(item: PrizeDetailInfo) => {
                  showPrizePoolModal(item)
                }}
                onDel={(id) => {
                  handleDelPrizePool({ id: id })
                }} />,
            ],
          },
        ]}
        rowKey="key"
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
        footer={() => [
          <Button key="addPrizePool" onClick={() => { showAddPrizePoolModal(activity); }} type="dashed" icon={<PlusOutlined />} >添加奖品</Button>,
          <Button key="resetLuckValue" danger onClick={() => { resetLuckValueHandle(activity); }} type="dashed" icon={<RedoOutlined />} >重置概率</Button>
        ]}
      />
    );
  };

  return (
    <PageContainer>
      <ProTable<Item, Params>
        headerTitle={'项目列表'}
        actionRef={actionRef}
        rowKey="id"
        // search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={list}
        columns={columns}
        expandable={{ expandedRowRender }}
      />
      <OperationModal
        done={done}
        open={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />

      <PrizePoolModal
        done={prizePoolModelDone}
        open={prizePoolModelVisible}
        onDone={prizePoolModelOnDone}
        onSubmit={prizePoolModelSubmit}
        current={prizePoolModelCurrent}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrent(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {current?.name && (
          <ProDescriptions<Item>
            column={2}
            title={current?.name}
            request={async () => ({
              data: current || {},
            })}
            params={{
              id: current?.id,
            }}
            columns={columns as ProDescriptionsItemProps<Item>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ActivityList;
