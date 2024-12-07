import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useContacts } from "../contexts/ContactsContext";

export function ContactsPage() {
  const { contacts, setContacts } = useContacts();

  const handleChange = (
    index: number,
    field: keyof (typeof contacts)[0],
    value: string
  ) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <Users className="text-purple-600" />
          <h1 className="text-xl font-semibold text-gray-800">Contacts</h1>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                  Nickname
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                  Wallet Address
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-100"
                >
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={contact.nickname}
                      onChange={(e) =>
                        handleChange(index, "nickname", e.target.value)
                      }
                      placeholder="Enter nickname"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={contact.walletAddress}
                      onChange={(e) =>
                        handleChange(index, "walletAddress", e.target.value)
                      }
                      placeholder="Enter wallet address"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
