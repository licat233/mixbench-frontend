import { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'antd';
import { ChatList, IChatItemProps, Navbar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'
import styles from './index.less';
import ChatWindow from './components/chatWindow';

import { Visitor, visitorList, VisitorListItem } from "@/services/swagger/chat";
import { JwtToken } from '@/services/swagger/authenticationComponents';

const genAvatar = (text: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    console.log("canvas not supported")
    return "https://img.alicdn.com/imgextra/i3/917298378/O1CN01eWbOih2BlB3tSBlMz_!!917298378.png"
  }
  // 设置画布尺寸
  canvas.width = 100;
  canvas.height = 100;
  // 绘制文字
  context.font = '36px Arial';
  context.fillText(text, 15, 65);
  return canvas.toDataURL()
}

// const demoChatItem: IChatItemProps = {
//   id: 0,
//   avatar: genAvatar("光平哥哥"),
//   alt: '光平哥哥',
//   title: '光平哥哥',
//   subtitle: 'What are you doing?',
//   date: new Date(),
//   unread: 0,
//   lazyLoadingImage: "",
// };

const Chat: React.FC = () => {
  const [currentChatItem, setCurrentChatItem] = useState<IChatItemProps | undefined>();
  const [visitorData, setVisitorData] = useState<IChatItemProps[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  let isFirstLoad = true

  //function
  const newChatVisitor = (data: VisitorListItem): IChatItemProps => {
    const res: IChatItemProps = {
      id: data.visitor.id,
      avatar: genAvatar(data.visitor.name),
      alt: data.visitor.name,
      title: data.visitor.name,
      subtitle: data.lastMessage?.content,
      date: data.lastMessage?.sendTime ? new Date(data.lastMessage.sendTime * 1000) : undefined,
      unread: 0,
      statusColor: "gray",
      statusText: data.visitor.status ? "在线" : "离线",
      lazyLoadingImage: undefined,
      onClick: () => {
        setCurrentChatItem(res);
      }
    };
    return res
  }
  const getVisitorData = async (): Promise<IChatItemProps[]> => {
    const respData = await visitorList({
      pageSize: 0,
      page: 0,
      current: 0,
      keyword: ''
    });
    const vistors = respData.data ? respData.data as VisitorListItem[] : [];
    const data: IChatItemProps[] = []
    vistors.forEach(item => {
      data.push(newChatVisitor(item))
    })
    return data
  }
  const loadVisitorData = async () => {
    const visitors = await getVisitorData()
    setVisitorData(visitors)
  }
  const connWS = () => {
    let wsProtocol = ""
    const httpProtocol = window.location.protocol;
    if (httpProtocol === 'https:') {
      wsProtocol = 'wss:'
    } else if (httpProtocol === 'http:') {
      wsProtocol = 'ws:'
    } else {
      console.info("%c Unable to determine the protocol for the current page!", "color:#b9a000");
    }
    let url = wsProtocol + '//micro.mixbench.net/v1/api/chat/public/ws/kefu?token='
    let tokenV = localStorage.getItem("jwtToken");
    if (!tokenV) {
      console.info("%c not found token!", "color:#b9a000")
      return false
    }
    try {
      const token = JSON.parse(tokenV) as JwtToken
      url = url + token.accessToken
    } catch (error) {
      console.info("%c JSON.parse filed!", "color:#b9a000")
    }

    console.info("%c ⏳Connecting to webSocket server ...", "color:#49BB00")
    // 创建WebSocket连接
    const socket = new WebSocket(url);

    // 监听连接事件
    socket.onopen = () => {
      console.info("%c 👌The WebSocket server is connected", "color:#49BB00")
    };

    // 接收消息
    socket.onmessage = (message) => {
      console.log('收到消息:', message.data);
      // 在此处处理接收到的消息
    };

    // 监听连接关闭事件
    socket.onclose = () => {
      if (socket.readyState === WebSocket.CLOSED) {
        console.info("%c 💔Websocket connection has been closed by the server!", "color:#b9a000")
      } else {
        console.info("%c 💔WebSocket connection is closed!", "color:#b9a000")
      }
    };

    //连接错误
    socket.onerror = () => {
      console.info("%c 💥Connection WebSocket Error!", "color:#c80000")
    }

    socketRef.current = socket;
  }

  //获取数据
  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoad = false
      loadVisitorData()
      connWS()
    }
    return () => {
      isFirstLoad = true;
    }
  }, [])

  return (
    <>
      <Row wrap={false} justify="space-between" className={styles.chatContainer}>
        <Col xs={0} sm={9} md={10} lg={8} xl={8} style={{ minHeight: '100%' }} className={styles.chatFriendContainer}>
          <Navbar className={styles.navbar} center={<div>好友列表</div>} />
          <ChatList
            id="0"
            lazyLoadingImage=""
            className='chat-list'
            dataSource={visitorData} />
        </Col>
        <Col xs={24} sm={15} md={14} lg={16} xl={16} style={{ minHeight: '100%' }}>
          <ChatWindow current={currentChatItem} />
        </Col>
      </Row>
    </>
  );
};

export default Chat;
