import React from "react";
import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  const isError = message.toLowerCase().includes("error");
  const isCongrats = message.toLowerCase().includes("congratulations");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-purple-600" : "bg-gray-600"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
      <motion.div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-purple-600 text-white"
            : isError
              ? "bg-red-100 text-red-800 border-2 border-red-300"
              : isCongrats
                ? "bg-green-100 text-green-800 border-2 border-green-300 font-semibold"
                : "bg-gray-100 text-gray-800"
        }`}
        animate={
          isCongrats
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 0.5 },
              }
            : {}
        }
      >
        {isUser ? (
          message
        ) : (
          // Render bot message as HTML safely
          <div dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </motion.div>
    </motion.div>
  );
}
