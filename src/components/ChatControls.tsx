import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mic, VolumeX, Volume2 } from 'lucide-react';

interface ChatControlsProps {
  isListening: boolean;
  isMuted: boolean;
  isTypingMode: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
  onToggleTyping: () => void;
  onSendMessage: (message: string) => void;
}

export function ChatControls({
  isListening,
  isMuted,
  isTypingMode,
  onToggleListening,
  onToggleMute,
  onToggleTyping,
  onSendMessage,
}: ChatControlsProps) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
        <motion.button
          onClick={onToggleMute}
          className="p-2 rounded-full hover:bg-gray-100"
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </motion.button>

        <motion.button
          onClick={onToggleTyping}
          className="p-2 rounded-full hover:bg-gray-100"
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={24} />
        </motion.button>

        <AnimatePresence>
          {isTypingMode && (
            <motion.form
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex-1 overflow-hidden"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type your message..."
                autoFocus
              />
            </motion.form>
          )}
        </AnimatePresence>

        <motion.button
          onClick={onToggleListening}
          className={`relative p-4 rounded-full text-white transition-colors ${
            isListening ? 'bg-red-500' : 'bg-purple-600 hover:bg-purple-700'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <Mic size={24} />
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-red-300"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}