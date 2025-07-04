"use client";

import React from "react";

import { useState, useCallback } from "react";
import { X, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  content: React.ReactNode;
}

interface WindowManagerProps {
  windows: WindowState[];
  onWindowUpdate: (windowId: string, updates: Partial<WindowState>) => void;
  onWindowClose: (windowId: string) => void;
}

export function WindowManager({
  windows,
  onWindowUpdate,
  onWindowClose,
}: WindowManagerProps) {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    windowId: string | null;
    offset: { x: number; y: number };
  }>({
    isDragging: false,
    windowId: null,
    offset: { x: 0, y: 0 },
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, windowId: string) => {
      const window = windows.find((w) => w.id === windowId);
      if (!window) return;

      setDragState({
        isDragging: true,
        windowId,
        offset: {
          x: e.clientX - window.position.x,
          y: e.clientY - window.position.y,
        },
      });

      // Bring window to front
      const maxZ = Math.max(...windows.map((w) => w.zIndex));
      onWindowUpdate(windowId, { zIndex: maxZ + 1 });
    },
    [windows, onWindowUpdate]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !dragState.windowId) return;

      onWindowUpdate(dragState.windowId, {
        position: {
          x: e.clientX - dragState.offset.x,
          y: e.clientY - dragState.offset.y,
        },
      });
    },
    [dragState, onWindowUpdate]
  );

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      windowId: null,
      offset: { x: 0, y: 0 },
    });
  }, []);

  // Add global mouse event listeners
  React.useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      {windows
        .filter((window) => window.isOpen && !window.isMinimized)
        .map((window) => (
          <div
            key={window.id}
            className={cn(
              "fixed bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden",
              window.isMaximized ? "inset-0" : ""
            )}
            style={{
              left: window.isMaximized ? 0 : window.position.x,
              top: window.isMaximized ? 0 : window.position.y,
              width: window.isMaximized ? "100%" : window.size.width,
              height: window.isMaximized ? "100%" : window.size.height,
              zIndex: window.zIndex + 50, // Ensure windows are always above other elements
            }}
          >
            {/* Window Header */}
            <div
              className="flex items-center justify-between px-2 md:px-4 py-2 md:py-3 bg-gray-50 border-b border-gray-200 cursor-move"
              onMouseDown={(e) => handleMouseDown(e, window.id)}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                handleMouseDown(
                  {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                  } as React.MouseEvent,
                  window.id
                );
              }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                {/* Traffic Light Buttons */}
                <button
                  onClick={() => onWindowClose(window.id)}
                  className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center group"
                >
                  <X className="w-1.5 h-1.5 md:w-2 md:h-2 text-red-800 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() =>
                    onWindowUpdate(window.id, { isMinimized: true })
                  }
                  className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center group"
                >
                  <Minus className="w-1.5 h-1.5 md:w-2 md:h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() =>
                    onWindowUpdate(window.id, {
                      isMaximized: !window.isMaximized,
                    })
                  }
                  className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center group"
                >
                  <Square className="w-1.5 h-1.5 md:w-2 md:h-2 text-green-800 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
              <h3 className="text-xs md:text-sm font-medium text-gray-700 flex-1 text-center">
                {window.title}
              </h3>
              <div className="w-12 md:w-16" /> {/* Spacer for centering */}
            </div>

            {/* Window Content */}
            <div className="flex-1 h-[calc(100%-36px)] md:h-[calc(100%-44px)] overflow-hidden">
              <div className="h-full overflow-y-auto">{window.content}</div>
            </div>
          </div>
        ))}
    </>
  );
}
