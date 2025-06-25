"use client";

import { useChat } from "@/hooks/useChat";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

const CHAT_CONFIG = {
  recipientName: "Jeffrey Li",
} as const;

export function Messages() {
  const { chatState, sendMessage, retryMessage, isLoading } = useChat();

  return (
    <div className="flex h-full bg-white">
      <div className="flex-1 flex flex-col max-h-[calc(100vh-2rem)] md:max-h-full">
        <ChatHeader recipientName={CHAT_CONFIG.recipientName} />

        <MessageList messages={chatState.messages} onRetry={retryMessage} />

        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
