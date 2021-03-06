import { useCallback } from 'react';
import moment from 'moment';
import { List, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useChatsQuery } from '../../graphql/types';

import { motion } from 'framer-motion'

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`;

const StyledList = styled(List)`
  padding: 0 !important;
`;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`;

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.div`
  margin-top: 5px;
`;

const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;

export const ChatsList = () => {
  let navigate = useNavigate();

  const navToChat = useCallback(
    (chat: { id: any }) => {
      //console.log(chat);
      navigate(`/chats/${chat.id}`);
    },
    [navigate]
  );

  const { data } = useChatsQuery();

  if (data === undefined || data.chats === undefined) {
    return null;
  }

  let chats = data.chats;

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: window.innerWidth, transition: { duration: 0.3 } }}>
      <Container>
        <StyledList>
          {chats.map((chat: any) => (
            <StyledListItem
              key={chat.id}
              data-testid="chat"
              button
              onClick={navToChat.bind(null, chat)}>
              <ChatPicture
                data-testid="picture"
                src={chat.picture}
                alt="Profile"
              />
              <ChatInfo>
                <ChatName data-testid="name">{chat.name}</ChatName>
                {chat.lastMessage && (
                  <>
                    <MessageContent data-testid="content">
                      {chat.lastMessage.content}
                    </MessageContent>
                    <MessageDate data-testid="date">
                      {moment(chat.lastMessage.createdAt).format('HH:mm')}
                    </MessageDate>
                  </>
                )}
              </ChatInfo>
            </StyledListItem>
          ))}
        </StyledList>
      </Container>
    </motion.div>
  );
};
