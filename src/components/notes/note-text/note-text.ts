import { Note } from "@/types/note";

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await fetch("/api/notes");
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    // Return fallback notes if API fails
    return [
      {
        id: "1",
        title: "📍 about me",
        content: "Typing...",
        date: "7/5/2025",
        preview: "currently...",
        isPinned: true,
        isSelected: true,
      },
      {
        id: "2",
        title: "🔗 quick links",
        content: "Typing...",
        date: "7/5/2025",
        preview: "useful links",
        isPinned: false,
        isSelected: false,
      },
    ];
  }
}

// For backward compatibility, export a default set of notes
// This will be used as fallback or initial state
export const sampleNotes: Note[] = [
  {
    id: "1",
    title: "📍 about me",
    content: "Loading...",
    date: "7/5/2025",
    preview: "currently...",
    isPinned: true,
    isSelected: true,
  },
  {
    id: "2",
    title: "🔗 quick links",
    content: "Loading...",
    date: "7/5/2025",
    preview: "useful links",
    isPinned: false,
    isSelected: false,
  },
];
