import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,  
} from "react-router-dom";

import { ChatsListScreen } from './components/ChatsListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

function App() {  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/chats" element={<ChatsListScreen />} />
      <Route path="/chats/:chatId" element={<ChatRoomScreen />} />
      <Route
        path="*"
        element={<Navigate to="/chats" replace />}
    />
    </Routes>    
  </BrowserRouter>
  );
}

export default App;
