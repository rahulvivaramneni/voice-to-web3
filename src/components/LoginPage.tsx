import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="flex-1 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn size={20} />
              Login
            </motion.button>
            <motion.button
              type="button"
              className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus size={20} />
              Sign Up
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}