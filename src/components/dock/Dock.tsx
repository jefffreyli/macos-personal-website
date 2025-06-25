"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <div className="fixed bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl px-2 md:px-4 py-2 md:py-3 shadow-2xl border border-white/20 hover:bg-white/15 transition-colors duration-200">
        <div className="flex items-end gap-1 md:gap-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="relative group"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip */}
              {hoveredApp === app.id && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
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
                className={`transition-all duration-200 ease-out rounded-lg md:rounded-xl overflow-hidden ${
                  hoveredApp === app.id
                    ? "scale-110 md:scale-125 -translate-y-1 md:-translate-y-2"
                    : "scale-100"
                }`}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    className={cn(
                      "transition-all duration-200",
                      hoveredApp === app.id && "scale-110"
                    )}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
