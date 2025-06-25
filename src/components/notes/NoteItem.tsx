"use client";

import { Note } from "@/types/note";

interface NoteItemProps {
  note: Note;
  onSelect: (note: Note) => void;
}

export function NoteItem({ note, onSelect }: NoteItemProps) {
  // Extract emoji if it exists, otherwise use a default icon
  const emoji = note.title.match(/^([^\w\s]+)/)?.[1] || "📝";
  const titleWithoutEmoji = note.title.replace(/^[^\w\s]+ /, "");

  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(note)}
    >
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
  );
}
