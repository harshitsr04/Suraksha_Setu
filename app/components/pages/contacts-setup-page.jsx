// app/pages/ContactsSetupPage.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { User, Trash2, Plus, Heart } from "lucide-react-native"; 
import { useContacts } from "../../contexts/contacts-context";
import { Button } from "../ui/button"; // your custom button

export default function ContactsSetupPage({ onComplete }) {
  const { contacts, addContact, deleteContact } = useContacts();
  const [formContacts, setFormContacts] = useState([]);
  const [errors, setErrors] = useState({});

  const validatePhone = (phone = "") =>
    /^\d{10}$/.test(String(phone).replace(/\D/g, ""));

  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      name: "",
      phone: "",
      relationship: "Family",
      imageUrl: undefined,
    };
    setFormContacts((prev) => [...prev, newContact]);
  };

  const handleUpdateContact = (id, field, value) => {
    setFormContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleDeleteFormContact = (id) => {
    setFormContacts((prev) => prev.filter((c) => c.id !== id));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.endsWith(`-${id}`)) delete next[k];
      });
      return next;
    });
  };

  const validateAndSave = () => {
    const newErrors = {};

    if (formContacts.length < 3) {
      newErrors.contacts = "Please add at least 3 emergency contacts";
    }

    formContacts.forEach((contact) => {
      if (!contact.name || contact.name.trim().length < 2) {
        newErrors[`name-${contact.id}`] = "Name is required";
      }
      if (!validatePhone(contact.phone)) {
        newErrors[`phone-${contact.id}`] = "Phone must be 10 digits";
      }
    });

    const cleanedPhones = formContacts
      .map((c) => String(c.phone || "").replace(/\D/g, ""))
      .filter((p) => p.length === 10);
    if (new Set(cleanedPhones).size !== cleanedPhones.length) {
      newErrors.duplicates = "Duplicate phone numbers found";
    }

    if (Object.keys(newErrors).length === 0) {
      formContacts.forEach((contact) => {
        addContact(contact); // save to context
      });
      if (typeof onComplete === "function") onComplete();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Contacts</Text>
      <Text style={styles.subheading}>
        Add at least 3 trusted contacts who will be notified
      </Text>

      <ScrollView style={styles.scrollArea}>
        {formContacts.length === 0 && (
          <View style={styles.emptyContainer}>
            <Heart size={48} color="#ccc" />
            <Text style={styles.emptyText}>No contacts added yet</Text>
          </View>
        )}

        {formContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <TouchableOpacity style={styles.avatarContainer}>
              {contact.imageUrl ? (
                <Image
                  source={{ uri: contact.imageUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <User size={24} color="#888" />
              )}
            </TouchableOpacity>

            <View style={styles.contactDetails}>
              <TextInput
                style={[styles.input, errors[`name-${contact.id}`] && styles.inputError]}
                placeholder="Name"
                value={contact.name}
                onChangeText={(text) => handleUpdateContact(contact.id, "name", text)}
              />
              {errors[`name-${contact.id}`] && (
                <Text style={styles.errorText}>{errors[`name-${contact.id}`]}</Text>
              )}

              <View style={styles.phoneRow}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={[styles.input, { flex: 1 }, errors[`phone-${contact.id}`] && styles.inputError]}
                  placeholder="Phone"
                  keyboardType="numeric"
                  maxLength={10}
                  value={contact.phone}
                  onChangeText={(text) =>
                    handleUpdateContact(contact.id, "phone", text.replace(/\D/g, ""))
                  }
                />
              </View>
              {errors[`phone-${contact.id}`] && (
                <Text style={styles.errorText}>{errors[`phone-${contact.id}`]}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Relationship (Family/Friend/Other)"
                value={contact.relationship}
                onChangeText={(text) => handleUpdateContact(contact.id, "relationship", text)}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleDeleteFormContact(contact.id)}
              style={styles.deleteButton}
            >
              <Trash2 size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {errors.contacts && <Text style={styles.errorText}>{errors.contacts}</Text>}
        {errors.duplicates && <Text style={styles.errorText}>{errors.duplicates}</Text>}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Plus size={20} color="#2563EB" />
        <Text style={styles.addButtonText}>Add Contact ({formContacts.length})</Text>
      </TouchableOpacity>

      <Button onPress={validateAndSave} style={styles.continueButton}>
        Complete Setup
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f8" },
  heading: { fontSize: 24, fontWeight: "bold", color: "#2563EB", textAlign: "center" },
  subheading: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 16 },
  scrollArea: { flex: 1 },
  emptyContainer: { alignItems: "center", marginVertical: 40 },
  emptyText: { color: "#888", marginTop: 8 },
  contactCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%" },
  contactDetails: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 6,
    fontSize: 14,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 4 },
  phoneRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  countryCode: { paddingHorizontal: 6, fontSize: 14, color: "#555" },
  deleteButton: { marginLeft: 8 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563EB",
    marginBottom: 16,
    gap: 6,
  },
  addButtonText: { color: "#2563EB", fontWeight: "bold" },
  continueButton: { backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 8 },
});