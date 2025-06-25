"use client";

import { useEffect, useState } from "react";
import { Note } from "@/types/note";

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

  const renderFormattedContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("•")) {
        return (
          <div key={index} className="flex items-start gap-2 mb-2">
            <span className="text-gray-600 mt-1">•</span>
            <span className="flex-1">{line.substring(1).trim()}</span>
          </div>
        );
      } else if (
        line.trim() &&
        !line.startsWith(" ") &&
        index > 0 &&
        lines[index - 1] === ""
      ) {
        return (
          <h3 key={index} className="font-semibold text-gray-900 mt-6 mb-3">
            {line}
          </h3>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="mb-3 text-gray-800">
            {line}
          </p>
        );
      } else {
        return <div key={index} className="mb-2" />;
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">
            {note.title.replace(/^[^\w\s]+ /, "")}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">{formatDate()}</span>
        </div>
        <div className="prose prose-gray max-w-none">
          <div className="text-base leading-relaxed">
            {renderFormattedContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
}
