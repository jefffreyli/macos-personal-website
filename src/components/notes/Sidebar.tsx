"use client";

import { Search, Pin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NoteItem } from "@/components/notes/NoteItem";
import { Note } from "@/types/note";
import { useState } from "react";

interface SidebarProps {
  notes: Note[];
  onNoteSelect: (note: Note) => void;
}

export function Sidebar({ notes, onNoteSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Section */}
        {pinnedNotes.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Pin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Pinned</span>
            </div>
            <div className="space-y-1">
              {pinnedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onClick={() => onNoteSelect(note)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Notes */}
        <div className="p-4">
          <div className="space-y-1">
            {unpinnedNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onClick={() => onNoteSelect(note)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
