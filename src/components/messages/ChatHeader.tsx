import { VideoIcon, Info } from "lucide-react";

interface ChatHeaderProps {
  recipientName: string;
}

export function ChatHeader({ recipientName }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">To:</span>
        <span className="font-medium">{recipientName}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Info"
        >
          <Info className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
