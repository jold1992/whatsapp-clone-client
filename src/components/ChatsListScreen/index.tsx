import React from 'react';
import { useParams } from 'react-router-dom';
import { ChatsList } from './ChatsList';
import { ChatsNavbar } from './ChatsNavbar';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`;

export const ChatsListScreen = () => {

  const {history} = useParams();

  return (
    <Container>
      <ChatsNavbar />
      <ChatsList history={history} />
    </Container>
  );
};
