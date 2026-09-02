"use client";
import { useState, useEffect, useRef } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "current-user-id";

  useEffect(() => {
    fetch(`/api/messages?conversationId=${params.id}`)
      .then(res => res.json())
      .then(data => { setMessages(data); setLoading(false); });
  }, [params.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, senderId: currentUserId, conversationId: params.id }),
    });
    const newMessage = await res.json();
    setMessages([...messages, newMessage]);
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-teal-600 text-white p-3 flex items-center gap-3">
        <a href="/" className="text-xl">?</a>
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">C</div>
        <div>
          <div className="font-medium">Chat</div>
          <div className="text-xs opacity-75">online</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-teal-50">
        {messages.map((msg: any) => (
          <MessageBubble key={msg.id} message={msg} currentUserId={currentUserId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
