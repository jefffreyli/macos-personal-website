"use client";

import { Note } from "@/types/note";
import { cn } from "@/lib/utils";

interface NoteItemProps {
  note: Note;
  onClick: () => void;
}

export function NoteItem({ note, onClick }: NoteItemProps) {
  // Extract emoji if it exists, otherwise use a default icon
  const emoji = note.title.match(/^([^\w\s]+)/)?.[1] || "📝";
  const titleWithoutEmoji = note.title.replace(/^[^\w\s]+ /, "");

  return (
    <div
      // onClick={onClick}
      className={cn(
        "p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100",
        note.isSelected && "bg-gray-100"
      )}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg" role="img" aria-label={titleWithoutEmoji}>
          {emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">
            {titleWithoutEmoji}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-2">{note.preview}</p>
        </div>
      </div>
    </div>
  );
}
