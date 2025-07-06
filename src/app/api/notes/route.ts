import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Note } from "@/types/note";

const notesDir = path.join(
  process.cwd(),
  "src/components/notes/note-text/notes"
);

function readNoteFile(filename: string): string {
  try {
    return fs.readFileSync(path.join(notesDir, filename), "utf-8");
  } catch (error) {
    console.error(`Error reading note file ${filename}:`, error);
    return "";
  }
}

export async function GET() {
  try {
    const notes: Note[] = [
      {
        id: "1",
        title: "📍 about me",
        content: readNoteFile("about-me.txt"),
        date: "7/5/2025",
        preview: "currently...",
        isPinned: true,
        isSelected: true,
      },
      {
        id: "2",
        title: "🔗 quick links",
        content: readNoteFile("quick-links.txt"),
        date: "7/5/2025",
        preview: "useful links...",
        isPinned: false,
        isSelected: false,
      },
    ];

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error loading notes:", error);
    return NextResponse.json(
      { error: "Failed to load notes" },
      { status: 500 }
    );
  }
}
