"use client";

import { useState } from "react";
import { Sidebar } from "@/components/notes/Sidebar";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { Note } from "@/types/note";
import { sampleNotes } from "@/components/notes/note-text/about-me";
import { Dock } from "@/components/dock/Dock";
import { WindowManager, WindowState } from "@/components/WindowManager";
import { Finder } from "@/components/finder/Finder";
import { Photos } from "@/components/photos/Photos";
import { Spotify } from "@/components/spotify/Spotify";
import { Messages } from "@/components/messages/Messages";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [selectedNote, setSelectedNote] = useState<Note>(sampleNotes[0]);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  const openWindow = (
    appId: string,
    title: string,
    content: React.ReactNode
  ) => {
    const existingWindow = windows.find((w) => w.id === appId);
    if (existingWindow) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === appId
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex }
            : w
        )
      );
      setNextZIndex((prev) => prev + 1);
      return;
    }

    const newWindow: WindowState = {
      id: appId,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 900, height: 600 },
      zIndex: nextZIndex,
      content,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
  };

  const updateWindow = (windowId: string, updates: Partial<WindowState>) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, ...updates } : w))
    );
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isOpen: false } : w))
    );
  };

  const dockApps = [
    {
      id: "finder",
      name: "Finder",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png",
      onClick: () => {
        openWindow("finder", "Finder", <Finder />);
      },
    },
    {
      id: "note",
      name: "Note",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Notes_icon.svg/240px-Apple_Notes_icon.svg.png?20220520065014",
      onClick: () => {},
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Spotify_1.png",
      onClick: () => {
        openWindow("spotify", "Spotify", <Spotify />);
      },
    },
    {
      id: "mail",
      name: "Mail",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mail_%28iOS%29.svg/1200px-Mail_%28iOS%29.svg.png?20141024222707",
      onClick: () => {
        window.open("mailto:jeffreyli8000@gmail.com", "_self");
      },
    },
    {
      id: "photos",
      name: "Photos",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Foto_%28iOS%29.png/500px-Foto_%28iOS%29.png",
      onClick: () => {
        openWindow("photos", "Photos", <Photos />);
      },
    },
    {
      id: "messages",
      name: "Messages",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg",
      onClick: () => {
        openWindow("messages", "Messages", <Messages />);
      },
    },
  ];

  const handleNoteSelect = (note: Note) => {
    setNotes((prev) =>
      prev.map((n) => ({ ...n, isSelected: n.id === note.id }))
    );
    setSelectedNote(note);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar notes={notes} onNoteSelect={handleNoteSelect} />
      <div className="flex-1">
        <NoteEditor note={selectedNote} />
      </div>
      <WindowManager
        windows={windows}
        onWindowUpdate={updateWindow}
        onWindowClose={closeWindow}
      />
      <Dock apps={dockApps} />
    </div>
  );
}
