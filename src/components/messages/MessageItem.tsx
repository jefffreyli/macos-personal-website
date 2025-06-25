import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

export interface MessageItemProps {
  /** The message to display */
  message: Message;
  /** Optional function to retry a failed message */
  onRetry?: (messageId: string) => Promise<void>;
}

export function MessageItem({ message, onRetry }: MessageItemProps) {
  const isError = message.status === "error";
  const isSending = message.status === "sending";
  const isBot = message.isBot;

  const handleRetryClick = async () => {
    if (isError && onRetry) {
      await onRetry(message.id);
    }
  };

  return (
    <div className={cn("flex", isBot ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-md px-4 py-2 rounded-2xl relative group transition-all",
          isBot ? "bg-gray-200 text-gray-900" : "bg-blue-500 text-white",
          isError && "opacity-50 cursor-pointer hover:opacity-70",
          isSending && "animate-pulse"
        )}
        onClick={isError ? handleRetryClick : undefined}
        role={isError ? "button" : undefined}
        tabIndex={isError ? 0 : undefined}
        aria-label={isError ? "Retry message" : undefined}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>

        <div
          className={cn(
            "text-xs mt-1 opacity-60 flex items-center gap-1",
            isBot && "text-gray-600",
            !isBot && "text-blue-100"
          )}
        >
          <span>{message.timestamp}</span>

          {isError && (
            <>
              <AlertCircle className="w-3 h-3" />
              <span className="text-red-500 font-medium">Tap to retry</span>
            </>
          )}

          {isSending && (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Sending...</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
