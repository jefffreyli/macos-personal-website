import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: Message[];
  onRetry: (messageId: string) => Promise<void>;
}

export function MessageList({ messages, onRetry }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} onRetry={onRetry} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
