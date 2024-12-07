import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, ArrowDownToLine, CreditCard } from 'lucide-react';

interface QuickActionProps {
  onActionSelect: (action: string) => void;
}

const actions = [
  { id: 1, text: 'My Wallet Address', icon: Wallet },
  { id: 2, text: 'My Current Balance', icon: Coins },
  { id: 3, text: 'Top up ETH from faucet', icon: ArrowDownToLine },
  { id: 4, text: 'On ramp USDC', icon: CreditCard },
];

export function QuickActions({ onActionSelect }: QuickActionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-4xl mx-auto w-full">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          onClick={() => onActionSelect(action.text)}
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-purple-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-2 bg-purple-100 rounded-lg">
            <action.icon className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-gray-700 font-medium">{action.text}</span>
        </motion.button>
      ))}
    </div>
  );
}