import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/chat" className="text-xl font-semibold text-purple-600">
          VoiceChat AI
        </Link>
        <div className="flex gap-4">
          <Link
            to="/chat"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/chat"
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MessageSquare size={20} />
            <span>Chat</span>
          </Link>
          <Link
            to="/contacts"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/contacts"
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users size={20} />
            <span>Contacts</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
