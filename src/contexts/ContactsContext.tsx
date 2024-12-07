import React, { createContext, useContext, useState, ReactNode } from "react";

interface Contact {
  nickname: string;
  walletAddress: string;
}

interface ContactsContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

// Create the context
const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

// Context provider component
export const ContactsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      nickname: "Alice",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    { nickname: "", walletAddress: "" },
    { nickname: "", walletAddress: "" },
    { nickname: "", walletAddress: "" },
  ]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

// Custom hook to use the context
export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
