"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

interface ChatHeaderProps {
  recipientName: string;
}

export function ChatHeader({ recipientName }: ChatHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-gray-200">
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs md:text-sm text-gray-500">To:</span>
        <span className="text-sm md:text-base font-medium">
          {recipientName}
        </span>
      </div>
      <div className="flex items-center gap-1.5 md:gap-2 relative">
        <button
          className="p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Info"
          onClick={toggleTooltip}
        >
          <Info className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>

        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <h3 className="text-sm font-medium text-gray-900">
                  AI Assistant
                </h3>
              </div>
              <button
                onClick={toggleTooltip}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              This is a generative AI model that simulates conversations with
              Jeffrey Li. While it aims to provide helpful and accurate
              responses, the information provided may not always be completely
              accurate or up-to-date. Please verify important details
              independently.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mt-2">
              Messages are also saved for internal evaluation purposes to help
              improve the assistant.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
