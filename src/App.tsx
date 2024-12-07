import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { ChatPage } from "./components/ChatPage";
import { ContactsProvider } from "./contexts/ContactsContext";
import { ContactsPage } from "./components/ContactsPage";

import { Navbar } from "./components/Navbar";

function App() {
  return (
    <ContactsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/chat"
            element={
              <>
                <Navbar />
                <ChatPage />
              </>
            }
          />
          <Route
            path="/contacts"
            element={
              <>
                <Navbar />
                <ContactsPage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContactsProvider>
  );
}

export default App;
