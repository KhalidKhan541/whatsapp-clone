"use client";
import { useState, useEffect } from "react";
import { ChatList } from "@/components/ChatList";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setChats([
      { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", lastTime: "10:30 AM", unread: 2, avatar: "" },
      { id: "2", name: "Jane Smith", lastMessage: "See you tomorrow!", lastTime: "9:15 AM", unread: 0, avatar: "" },
      { id: "3", name: "Work Group", lastMessage: "Meeting at 3pm", lastTime: "Yesterday", unread: 5, avatar: "" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-teal-600 text-white p-4">
        <h1 className="text-xl font-bold">WhatsApp</h1>
        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
        />
      </div>
      <ChatList chats={chats} />
    </div>
  );
}
