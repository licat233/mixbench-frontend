import { logout, putCurrent, PutCurrentReq } from '@/services/swagger/admin-custom';
import { LogoutOutlined, SafetyOutlined, SettingOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, message, Spin } from 'antd';
import { setAlpha } from '@ant-design/pro-components';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import OperationModal from './components/OperationModal';
import PutPasswordModal from './components/PasswordModal';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};



const handleUpdate = async (req: PutCurrentReq) => {
  const hide = message.loading('更新中...');
  try {
    await putCurrent(req);
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
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  try {
    const resp = await logout();
    if (!resp.success) {
      if (resp.errorCode !== 401) {
        message.error(resp.errorMessage)
        return
      }
    }
  } catch (error) {
    if ((error as any)?.response?.status !== 401) {
      return
    }
  }
  localStorage.removeItem("jwtToken")
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const onDone = () => {
    setDone(false);
    setVisible(false);
  }

  const pwdModalOnDone = () => {
    setPwdModalVisible(false);
  }

  const Name = () => {
    const nameClassName = useEmotionCss(({ token }) => {
      return {
        width: '70px',
        height: '48px',
        overflow: 'hidden',
        lineHeight: '48px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          display: 'none',
        },
      };
    });

    return <span className={`${nameClassName} anticon`}>{currentUser?.name}</span>;
  };

  const AvatarLogo = () => {
    const avatarClassName = useEmotionCss(({ token }) => {
      return {
        marginRight: '8px',
        color: token.colorPrimary,
        verticalAlign: 'top',
        background: setAlpha(token.colorBgContainer, 0.85),
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          margin: 0,
        },
      };
    });

    return <Avatar size="small" className={avatarClassName} src={currentUser?.avatar} alt="avatar" />;
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const onSubmit = async (req: PutCurrentReq): Promise<boolean> => {
    const ok = await handleUpdate(req)
    setDone(ok)
    if (ok) {
      fetchUserInfo()
    }
    return ok
  }

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      switch (key) {
        case 'logout':
          flushSync(() => {
            setInitialState((s) => ({ ...s, currentUser: undefined }));
          });
          loginOut();
          break
        case 'settings':
          setVisible(true);
          break
        case 'putpassword':
          setPwdModalVisible(true);
          break
        default:
      }
      // if (key === 'logout') {
      //   flushSync(() => {
      //     setInitialState((s) => ({ ...s, currentUser: undefined }));
      //   });
      //   loginOut();
      //   return;
      // }
      // setVisible(key === 'settings');
      // setPwdModalVisible(key === 'putpassword');
      // history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const menuItems = [
    ...(menu
      ? [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '账户设置',
        },
        {
          key: 'putpassword',
          icon: <SafetyOutlined />,
          label: '更改密码',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        <span className={actionClassName}>
          <AvatarLogo />
          <Name />
        </span>
      </HeaderDropdown>
      <OperationModal
        done={done}
        open={visible}
        current={currentUser}
        onDone={onDone}
        onSubmit={onSubmit} />
      <PutPasswordModal
        open={pwdModalVisible}
        onDone={pwdModalOnDone} />
    </>
  );
};

export default AvatarDropdown;
