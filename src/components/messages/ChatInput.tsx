import { useState, KeyboardEvent } from "react";
import { Send, Loader2, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ChatInputProps {
  /** Function to call when user sends a message */
  onSendMessage: (content: string) => Promise<void>;
  /** Whether the input should be disabled */
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSendMessage(trimmedMessage);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isInputDisabled = disabled || isSubmitting;
  const canSend = message.trim().length > 0 && !isInputDisabled;

  return (
    <div className="p-2 md:p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-1.5 md:gap-2">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="border-gray-300 rounded-full pr-10 md:pr-12 text-sm md:text-base h-9 md:h-10"
            disabled={isInputDisabled}
            maxLength={1000}
          />

          {canSend && (
            <button
              onClick={handleSubmit}
              disabled={isInputDisabled}
              className={cn(
                "absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 p-1 md:p-1.5 rounded-full",
                "bg-blue-500 hover:bg-blue-600 text-white transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
              )}
            </button>
          )}
        </div>

        {!canSend && (
          <>
            <button
              className={cn(
                "p-1.5 md:p-2 rounded transition-colors",
                isInputDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              )}
              disabled={isInputDisabled}
              aria-label="Voice message"
              onClick={handleSubmit}
            >
              <SendHorizonal className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {message.length > 900 && (
        <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 text-right">
          {message.length}/1000 characters
        </div>
      )}
    </div>
  );
}
