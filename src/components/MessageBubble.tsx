"use client";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  readBy: string[];
}

export function MessageBubble({ message, currentUserId }: { message: Message; currentUserId: string }) {
  const isOwn = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-xs px-3 py-2 rounded-lg ${isOwn ? "bg-green-100 text-gray-800" : "bg-white text-gray-800 shadow"}`}>
        <p className="text-sm">{message.content}</p>
        <div className="flex justify-end gap-1 mt-1">
          <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          {isOwn && (
            <span className="text-xs">{message.readBy.length > 1 ? "✓✓" : "✓"}</span>
          )}
        </div>
      </div>
    </div>
  );
}
