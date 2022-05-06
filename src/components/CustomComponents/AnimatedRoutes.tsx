import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ChatRoomScreen from '../ChatRoomScreen';
import { ChatsListScreen } from '../ChatsListScreen';

import { AnimatePresence } from 'framer-motion';

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/chats" element={<ChatsListScreen />} />
        <Route path="/chats/:chatId" element={<ChatRoomScreen />} />
        <Route path="*" element={<Navigate to="/chats" replace />} />
      </Routes>
    </AnimatePresence>
  );
};
