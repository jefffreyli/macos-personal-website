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
} from "lucide-react";

export function Finder() {
  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 border-r border-gray-200 p-2">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">
            Favorites
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              AirDrop
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded">
              <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded"></div>
              </div>
              Recents
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-4 h-4 text-blue-500" />
              Applications
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded bg-gray-200">
              <Folder className="w-4 h-4 text-blue-500" />
              Desktop
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-4 h-4 text-blue-500" />
              Documents
            </div>
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded">
              <Folder className="w-4 h-4 text-blue-500" />
              Downloads
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-800 ml-2">
              Desktop
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <List className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Share className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* File List Header */}
        <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="flex-1">Name</div>
          <div className="w-20">Size</div>
          <div className="w-32">Kind</div>
          <div className="w-40">Date Added</div>
        </div>

        {/* File List */}
        <div className="flex-1 p-4">
          <a
            href="/Li_Jeffrey_Resume.docx.pdf"
            download="Jeffrey Li Resume.pdf"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <File className="w-5 h-5 text-gray-600" />
            <div className="flex-1">Jeffrey Li Resume.pdf</div>
            <div className="w-20 text-sm text-gray-500">150 KB</div>
            <div className="w-32 text-sm text-gray-500">PDF Document</div>
            <div className="w-40 text-sm text-gray-500">Jun 23, 2025</div>
          </a>
        </div>
      </div>
    </div>
  );
}
