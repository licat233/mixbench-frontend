import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProDescriptions, ProDescriptionsItemProps, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import { addUser as add, delUser as del, userDetails, putUser as put, addUserPool, delUserPool, putUserPool } from '@/services/swagger/luckydraw';
import { User, AddUserReq as AddReq, PutUserReq as PutReq, GetUserListReqParams as Params, UserDetail, BaseResp, UserActivity, PutUserPoolReq, AddUserPoolReq, DelUserPoolReq, UserPool } from "@/services/swagger/luckydrawComponents";
import OperationModal from './components/OperationModal';
import { ActivityDetailInfo } from './data';
import UserPoolModal from './components/UserPoolModal';
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

const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<User>();


  const showEditModal = (user: User) => {
    setVisible(true);
    setCurrent(user);
  };

  const delHandle = (user_id: number) => {
    Modal.confirm({
      title: '删除警告',
      content: '确定删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const ok = await handleRemove(user_id)
        //刷新列表
        if (actionRef.current && ok) {
          actionRef.current.reload();
        }
      },
    });
  };

  const columns: ProColumns<User>[] = [
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
      title: '用户名',
      dataIndex: 'name',
      // tip: 'The user uuid is the unique key',
      render: (dom, entity) => {
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
      title: '凭证',
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
      title: '积分',
      dataIndex: "score",
      valueType: 'digit',
    },
    {
      title: '地址',
      dataIndex: "address",
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      // sorter: true,
      // hideInSearch: true,
      valueType: 'text',
      valueEnum: {
        0: {
          text: '未授权',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Success',
        },
        2: {
          text: '已冻结',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => [
        <MoreActionBtn key="more" current={record}
          onEdit={(user) => { showEditModal(user) }}
          onDel={(id) => { delHandle(id) }}
        />,
      ],
    },
  ];


  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent(undefined);
  };

  const handleSubmit = async (record: User): Promise<boolean> => {
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

  //数据缓存
  const userPoolCache = useRef<Map<number, UserDetail>>(new Map());

  const list = async (req: Params): Promise<BaseResp> => {
    const respData = await userDetails(req)
    const list = respData.data ? respData.data as UserDetail[] : [];
    const res = list.map<User>(item => {
      userPoolCache.current.set(item.user.id, item);
      return item.user as User
    })
    respData.data = res
    return respData
  }

  //children render
  const handleUpdateUserPool = async (req: PutUserPoolReq) => {
    const hide = message.loading('更新中...');
    try {
      await putUserPool(req);
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  }

  const handleAddUserPool = async (req: AddUserPoolReq) => {
    const hide = message.loading('正在添加');
    try {
      await addUserPool(req);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败');
      return false;
    }
  }

  const handleDelUserPool = async (req: DelUserPoolReq) => {
    const del = async () => {
      const hide = message.loading('正在删除');
      try {
        await delUserPool(req);
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
      content: '确定删除该用户参与的活动吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => del(),
    });
  }

  const [userPoolModelVisible, setUserPoolModelVisible] = useState<boolean>(false);
  const [userPoolModelCurrent, setUserPoolModelCurrent] = useState<ActivityDetailInfo>()
  const [userPoolModelDone, setUserPoolModelDone] = useState<boolean>(false)

  const userPoolModelOnDone = () => {
    setUserPoolModelDone(false);
    setUserPoolModelVisible(false);
    setUserPoolModelCurrent(undefined);
  }

  const userPoolModelSubmit = async (record: UserPool): Promise<boolean> => {
    const method = record?.id ? 'update' : 'add';
    let ok: boolean = false
    if (method === 'update') {
      ok = await handleUpdateUserPool(record)
    } else if (method === 'add') {
      ok = await handleAddUserPool(record)
    }
    setUserPoolModelDone(ok);
    //刷新列表
    if (ok) actionRef.current?.reload();
    return ok
  }

  const showUserPoolModal = (activityDetailInfo: ActivityDetailInfo) => {
    setUserPoolModelCurrent(activityDetailInfo)
    setUserPoolModelVisible(true);
  }

  const showAddUserPoolModal = (user: User) => {
    const pd: any = { user }
    showUserPoolModal(pd as unknown as ActivityDetailInfo)
  }

  const expandedRowRender = (user: User) => {
    if (!userPoolCache.current.has(user.id)) {
      message.error(`${user.name}参与活动数据丢失！`)
      return <></>
    }
    const cache = userPoolCache.current.get(user.id)?.userActivities
    const data = cache?.map<ActivityDetailInfo>((item: UserActivity, index: number) => {
      return {
        key: index,
        name: item.activity.name,
        score: item.userPool.score,  //在某活动中的积分
        status: item.userPool.status,  //状态
        user: user,  //参与用户信息
        userPool: item.userPool,
        activity: item.activity
      }
    });

    return (
      <ProTable
        columns={[
          { title: '活动名称', dataIndex: 'name', key: 'name', valueType: "text" },
          { title: '积分', dataIndex: 'score', key: 'score', valueType: "digit" },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              1: {
                text: '允许',
                status: 'Success',
              },
              0: {
                text: '禁止',
                status: 'Default',
              },
            },
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            valueType: 'option',
            render: (_, record: ActivityDetailInfo) => [
              <a href="#!" onClick={(e) => { e.preventDefault(); showUserPoolModal(record) }} key="updateUserPool">编辑</a>,
              <a href="#!" hidden={true} onClick={(e) => { e.preventDefault(); handleDelUserPool({ id: record.userPool.id }) }} key="delUserPool">删除</a>
            ],
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
        footer={() => [
          <Button key="addUserPool" onClick={() => { showAddUserPoolModal(user); }} type="dashed" icon={<PlusOutlined />} >添加活动</Button>
        ]}
      />
    );
  };

  return (
    <PageContainer>
      <ProTable<User, Params>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="id"
        // search={false}
        // options={{
        //   search: true,
        // }}
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

      <UserPoolModal
        done={userPoolModelDone}
        open={userPoolModelVisible}
        onDone={userPoolModelOnDone}
        onSubmit={userPoolModelSubmit}
        current={userPoolModelCurrent}
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
          <ProDescriptions<User>
            column={2}
            title={current?.name}
            request={async () => ({
              data: current || {},
            })}
            params={{
              id: current?.id,
            }}
            columns={columns as ProDescriptionsItemProps<User>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
