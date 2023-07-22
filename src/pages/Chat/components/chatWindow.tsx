/* eslint-disable react-hooks/rules-of-hooks */
import { Row, Col, Button } from 'antd';
import { FC, useState, useRef } from 'react';
import { IChatItemProps, Input as ChatInput, MessageList, MessageType, Navbar } from 'react-chat-elements';
import styles from '../index.less';

type ChatWindowProps = {
  current: IChatItemProps | undefined;
};

const ChatWindow: FC<ChatWindowProps> = (props) => {
  const { current } = props;
  if (!current) {
    return <Row className={styles.chatWindowContainer} style={{ minHeight: '100%' }} wrap={false} justify="space-between"></Row>;
  }

  //hook区
  const messageListReferance = useRef();
  const inputReferance = useRef();
  const [inputValue, setInputValue] = useState('');

  //data区
  const chatMessagesData: MessageType[] = [
    {
      id: 0,
      position: 'right',
      text: '你好呀！',
      title: "",
      type: 'text',
      focus: false,
      date: new Date(),
      titleColor: "#0000FF",
      forwarded: true,
      replyButton: true,
      removeButton: true,
      status: "sent",
      notch: false,
      retracted: false,
    },
  ];

  //function区
  const inputClear = () => { }
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const sendMessage = () => { }
  return (<Row className={styles.chatWindowContainer} style={{ minHeight: '100%' }} wrap={false} justify="space-between">
    <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.chatRecordContainer} style={{ minHeight: '100%' }}>
      <Navbar className={styles.navbar} center={<div>{current?.title}</div>} />
      <MessageList
        referance={messageListReferance}
        className={styles.messageList}
        lockable={false}
        toBottomHeight={'100%'}
        dataSource={chatMessagesData} />
      <ChatInput
        className={styles.chatInput}
        autofocus={false}
        referance={inputReferance}
        placeholder='输入消息...'
        multiline={true}
        maxHeight={200}
        clear={inputClear}
        value={inputValue}
        onChange={handleInputChange}
        rightButtons={
          <Button type="primary" className={styles.sendBtn} onClick={sendMessage}>
            发送
          </Button>
        }
      />
    </Col>
    <Col xs={0} sm={0} md={0} lg={8} xl={8} style={{ minHeight: '100%' }} className={styles.friendDetail}>
      <Navbar className={styles.navbar} center={<div>游客信息</div>} />
      <div></div>
    </Col>
  </Row>);
};

export default ChatWindow;
