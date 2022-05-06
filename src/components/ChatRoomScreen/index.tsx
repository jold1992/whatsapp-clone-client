import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { motion } from 'framer-motion';

import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen = () => {
  const [chat, setChat] = useState<OptionalChatQueryResult>(null);

  const params = useParams();
  console.log('params', params);

  const chatId = params.chatId;
  console.log('chatId', chatId);

  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getChatQuery,
        variables: { chatId },
      }),
    });
    const {
      data: { chat },
    } = await body.json();
    setChat(chat);
  }, [chatId]);

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null;
 
      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
      };
 
      setChat({
        ...chat,
        messages: chat.messages.concat(message),
      });
    },
    [chat]
  );

  if (!chat) return null;

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}>
      <Container>
        <ChatNavbar chat={chat} />
        {chat.messages && <MessagesList messages={chat.messages} />}
        <MessageInput onSendMessage={onSendMessage} />
      </Container>
    </motion.div>
  );
};

export default ChatRoomScreen;
