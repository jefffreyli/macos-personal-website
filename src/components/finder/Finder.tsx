"use client";

import {
  Folder,
  File,
  ChevronLeft,
  ChevronRight,
  Search,
  Grid3X3,
  List,
  Share,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export function Finder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-full bg-white">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-2 left-2 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isSidebarOpen ? (
          <X className="w-4 h-4 text-gray-600" />
        ) : (
          <Menu className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-48 bg-gray-50 border-r border-gray-200 p-2 h-full transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">
            Favorites
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
              </div>
              AirDrop
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded"></div>
              </div>
              Recents
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              Applications
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded bg-gray-200">
              <Folder className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              Desktop
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              Documents
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              Downloads
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 border-b border-gray-200">
          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <span className="text-base md:text-lg font-semibold text-gray-800 ml-1 md:ml-2 truncate">
              Desktop
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <List className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Grid3X3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Share className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* File List Header */}
        <div className="hidden md:flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="flex-1">Name</div>
          <div className="w-20">Size</div>
          <div className="w-32">Kind</div>
          <div className="w-40">Date Added</div>
        </div>

        {/* File List */}
        <div className="flex-1 p-2 md:p-4">
          <a
            href="/Li_Jeffrey_Resume.docx.pdf"
            download="Jeffrey Li Resume.pdf"
            className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <File className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            <div className="flex-1 text-sm md:text-base truncate">
              Jeffrey Li Resume.pdf
            </div>
            <div className="hidden md:block w-20 text-xs md:text-sm text-gray-500">
              150 KB
            </div>
            <div className="hidden md:block w-32 text-xs md:text-sm text-gray-500">
              PDF Document
            </div>
            <div className="hidden md:block w-40 text-xs md:text-sm text-gray-500">
              Jun 23, 2025
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
