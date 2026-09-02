"use client";
import Link from "next/link";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  avatar: string;
}

export function ChatList({ chats }: { chats: Chat[] }) {
  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
            {chat.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <span className="font-medium">{chat.name}</span>
              <span className="text-xs text-gray-500">{chat.lastTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 truncate">{chat.lastMessage}</span>
              {chat.unread > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
