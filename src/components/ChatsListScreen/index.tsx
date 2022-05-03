import React from 'react';
import { ChatsList } from './ChatsList';
import { ChatsNavbar } from './ChatsNavbar';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`;

export const ChatsListScreen = () => {

  return (
    <Container>
      <ChatsNavbar />
      <ChatsList />
    </Container>
  );
};
