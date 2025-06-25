import { Info } from "lucide-react";

interface ChatHeaderProps {
  recipientName: string;
}

export function ChatHeader({ recipientName }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-gray-200">
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs md:text-sm text-gray-500">To:</span>
        <span className="text-sm md:text-base font-medium">
          {recipientName}
        </span>
      </div>
      <div className="flex items-center gap-1.5 md:gap-2">
        <button
          className="p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Info"
        >
          <Info className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
