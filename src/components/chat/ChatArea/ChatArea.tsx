'use client';

import React from 'react';
import ChatInput from './ChatInput';
import MessageArea from './MessageArea';
const ChatArea = () => {
  return (
    <main className="relative m-1.5 flex flex-grow flex-col rounded-xl bg-background">
      <MessageArea />
      <div className="sticky bottom-0 bg-background px-4 pb-4 pt-2">
        <ChatInput />
      </div>
    </main>
  );
};

export default ChatArea;
