// app/contexts/contacts-context.js
import React, { createContext, useContext, useState } from "react";

// Create context
const ContactsContext = createContext();

// Provider component
export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Alice", phone: "1234567890", imageUrl: null },
    { id: 2, name: "Bob", phone: "9876543210", imageUrl: null },
  ]);

  // Function to add a contact
  const addContact = (contact) => {
    const newContact = {
      id: Date.now(),
      ...contact,
    };
    setContacts((prev) => [...prev, newContact]);
  };

  // Function to remove a contact
  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

// Custom hook
export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
