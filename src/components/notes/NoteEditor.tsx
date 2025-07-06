"use client";

import { useEffect, useState } from "react";
import { Note } from "@/types/note";
import { parseMarkdownToReact } from "@/lib/markdown";

interface NoteEditorProps {
  note: Note;
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [content, setContent] = useState(note.content);

  // Update content when note changes
  useEffect(() => {
    setContent(note.content);
  }, [note]);

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 md:gap-3">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate max-w-[200px] md:max-w-none">
            {note.title.replace(/^[^\w\s]+ /, "")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 md:p-6 overflow-y-auto">
        <div className="text-center mb-3 md:mb-4">
          <span className="text-xs md:text-sm text-gray-500">
            {formatDate()}
          </span>
        </div>
        <div className="prose prose-gray max-w-none prose-sm md:prose-base">
          <div className="text-sm md:text-base leading-relaxed">
            {parseMarkdownToReact(content)}
          </div>
        </div>
      </div>
    </div>
  );
}
