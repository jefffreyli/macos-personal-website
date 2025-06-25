"use client";

import { useState } from "react";

interface DockApp {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
}

interface DockProps {
  apps: DockApp[];
}

export function Dock({ apps }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-4 py-3 shadow-2xl border border-white/20 hover:bg-white/15 transition-colors duration-200">
        <div className="flex items-end gap-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="relative group"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip */}
              {hoveredApp === app.id && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {app.name}
                </div>
              )}

              {/* App Icon */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  app.onClick();
                }}
                className={`transition-all duration-200 ease-out rounded-xl overflow-hidden ${
                  hoveredApp === app.id
                    ? "scale-125 -translate-y-2"
                    : "scale-100"
                }`}
              >
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={app.name}
                  className="w-14 h-14 object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
