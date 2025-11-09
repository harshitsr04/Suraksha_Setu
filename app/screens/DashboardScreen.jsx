import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from "react-native";
import { createSOS } from "../api/index";

// Hooks & Contexts
import { useAlert } from "../contexts/alert-context";
import { useAuth } from "../contexts/auth-context";
import { useContacts } from "../contexts/contacts-context";
import { usePermissions } from "../contexts/permissions-context";

// Custom Hooks
import { useGeolocation } from "../hooks/use-geolocation";
import { useLiveLocation } from "../hooks/use-live-location";
import { useLoudnessDetection } from "../hooks/use-loudness-detection";
import { useVoiceRecognition } from "../hooks/use-voice-recognition";

// Onboarding Pages
import ContactsSetupPage from "../components/pages/contacts-setup-page.jsx";
import PermissionsPage from "../components/pages/permissions-page";
import VoiceSetupPage from "../components/pages/voice-setup-page.jsx";

export default function DashboardScreen() {
  const [showContactsSetup, setShowContactsSetup] = useState(false);
  const [showPermissionsSetup, setShowPermissionsSetup] = useState(false);
  const [showVoiceSetup, setShowVoiceSetup] = useState(false);

  const { user, logout } = useAuth();
  const { isAlertActive, triggerAlert, cancelAlert } = useAlert();
  const { contacts } = useContacts();
  const { micStream } = usePermissions();
  const { location } = useGeolocation(isAlertActive);
  const { isListening, triggerDetected, setTriggerDetected, startListening, stopListening } = useVoiceRecognition();
  const { loudness, isAboveThreshold } = useLoudnessDetection(isListening ? micStream : null);

  // --- Live location sender ---
  useLiveLocation(user?.id);

  // --- Onboarding check ---
  useEffect(() => {
    const checkSetupStatus = async () => {
      const contactsDone = await AsyncStorage.getItem("contactsSetupComplete");
      const permissionsDone = await AsyncStorage.getItem("permissionsGranted");
      const voiceDone = await AsyncStorage.getItem("voiceSetupComplete");

      if (!contactsDone) setShowContactsSetup(true);
      else if (!permissionsDone) setShowPermissionsSetup(true);
      else if (!voiceDone) setShowVoiceSetup(true);
    };
    checkSetupStatus();
  }, []);

  // --- Start voice listener ---
  useEffect(() => {
    startListening();
    return () => stopListening();
  }, [startListening, stopListening]);

  // --- SOS Handler ---
  const handleSOS = async () => {
    if (!user) {
      Alert.alert("Error", "Please log in to send SOS alerts.");
      return;
    }

    if (!contacts || contacts.length === 0) {
      Alert.alert("Error", "Please add emergency contacts first.");
      setShowContactsSetup(true);
      return;
    }

    // Ensure location is available before proceeding
    let currentLocation = location;
    if (!currentLocation) {
      Alert.alert("Location not available", "Could not get your location. Please try again.");
      return;
    }

    try {
      // First trigger the alert UI
      triggerAlert({
        userId: user.id,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        accuracy: currentLocation.accuracy,
      });

      // Then send the SOS
      const formattedContacts = contacts.map(contact => ({
        name: contact.name,
        phone: contact.phone,  // Make sure this matches your contacts structure
      }));

      const payload = { 
        userId: user.id, 
        contacts: formattedContacts,
        location: {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
          accuracy: currentLocation.accuracy
        },
        timestamp: new Date().toISOString()
      };

      const response = await createSOS(payload, user?.token);
      
      if (response?.mapLink) {
        Linking.openURL(response.mapLink);
      } else {
        const defaultMapLink = `https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}`;
        Linking.openURL(defaultMapLink);
      }

      // Show confirmation
      Alert.alert(
        "SOS Sent",
        "Emergency contacts have been notified of your location.",
        [{ text: "OK" }]
      );

      return response;
    } catch (err) {
      console.error("Error sending SOS:", err?.message || err);
      Alert.alert(
        "Error", 
        "Failed to send SOS. Your contacts may not have been notified.",
        [
          { 
            text: "Try Again", 
            onPress: handleSOS 
          },
          { 
            text: "Cancel", 
            style: "cancel",
            onPress: () => cancelAlert()
          }
        ]
      );
    }
  };

  // --- Voice Trigger SOS ---
  useEffect(() => {
    if (triggerDetected && isAboveThreshold && !isAlertActive && location) {
      handleSOS();
      setTriggerDetected(false);
    }
  }, [triggerDetected, isAboveThreshold, isAlertActive, location]);

  // --- Manual SOS button ---
  const handleManualSOS = () => {
    if (!isAlertActive) handleSOS();
  };

  // --- Onboarding Pages ---
  if (showContactsSetup) return <ContactsSetupPage onComplete={() => setShowContactsSetup(false)} />;
  if (showPermissionsSetup) return <PermissionsPage onComplete={() => setShowPermissionsSetup(false)} />;
  if (showVoiceSetup) return <VoiceSetupPage onComplete={() => setShowVoiceSetup(false)} />;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SurakshaSetu</Text>
        <TouchableOpacity onPress={logout}>
          <MaterialIcons name="error-outline" size={28} color="#0047AB" />
        </TouchableOpacity>
      </View>

      {/* Voice Status */}
      <View style={styles.voiceStatus}>
        <View style={[styles.voiceDot, { backgroundColor: isListening ? "green" : "gray" }]} />
        <Text style={styles.voiceText}>{isListening ? "Listening" : "Ready"}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {!isAlertActive ? (
          <View style={styles.sosContainer}>
            <Text style={styles.heading}>I m in danger!</Text>
            <Text style={styles.subText}>Tap the button or shout your SOS voice command</Text>

            <TouchableOpacity style={styles.sosButton} onPress={handleManualSOS}>
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>

            {/* Loudness Indicator */}
            <View style={styles.loudnessContainer}>
              <View style={styles.loudnessBar}>
                <View
                  style={[
                    styles.loudnessFill,
                    { width: `${Math.min(loudness, 100)}%`, backgroundColor: isAboveThreshold ? "green" : "blue" },
                  ]}
                />
              </View>
              <Text style={styles.loudnessText}>Ambient sound: {loudness.toFixed(0)} dB</Text>
            </View>

            {/* Contacts */}
            <View style={styles.contactsContainer}>
              <Text style={styles.contactHeading}>Contacts:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {contacts.slice(0, 4).map((contact) => (
                  <View key={contact.id} style={styles.contactCard}>
                    <View style={styles.contactAvatar}>
                      {contact.imageUrl ? (
                        <Image source={{ uri: contact.imageUrl }} style={styles.contactImage} />
                      ) : (
                        <Text style={styles.contactInitial}>{contact.name.charAt(0)}</Text>
                      )}
                    </View>
                    <Text style={styles.contactName}>{contact.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.alertContainer}>
            <MaterialIcons name="check-circle" size={64} color="green" />
            <Text style={styles.alertHeading}>Help is on the way</Text>
            <Text style={styles.alertSubText}>Your close contacts have been notified</Text>

            {location && (
              <View style={styles.locationBox}>
                <MaterialIcons name="location-on" size={20} color="blue" />
                <Text style={styles.locationText}>Live location tracking active</Text>
              </View>
            )}

            <TouchableOpacity style={styles.cancelButton} onPress={cancelAlert}>
              <Feather name="x" size={24} color="red" />
              <Text style={styles.cancelText}>Cancel False Alarm</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#ccc" },
  title: { fontSize: 20, fontWeight: "bold", color: "#0047AB" },
  voiceStatus: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginVertical: 8 },
  voiceDot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  voiceText: { fontSize: 14, color: "#333" },
  mainContent: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  sosContainer: { alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 4 },
  subText: { fontSize: 14, color: "#666", marginBottom: 16, textAlign: "center" },
  sosButton: { width: 200, height: 200, borderRadius: 100, backgroundColor: "red", justifyContent: "center", alignItems: "center", marginVertical: 16 },
  sosText: { fontSize: 48, color: "white", fontWeight: "bold" },
  loudnessContainer: { width: "100%", marginTop: 16 },
  loudnessBar: { width: "100%", height: 10, backgroundColor: "#ddd", borderRadius: 5, overflow: "hidden", marginBottom: 4 },
  loudnessFill: { height: "100%" },
  loudnessText: { textAlign: "center", fontSize: 12, color: "#555" },
  contactsContainer: { width: "100%", marginTop: 16 },
  contactHeading: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  contactCard: { alignItems: "center", marginRight: 12 },
  contactAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center", overflow: "hidden" },
  contactImage: { width: "100%", height: "100%" },
  contactInitial: { fontSize: 24, fontWeight: "bold", color: "#666" },
  contactName: { fontSize: 12, textAlign: "center", marginTop: 4, width: 60 },
  alertContainer: { alignItems: "center" },
  alertHeading: { fontSize: 24, fontWeight: "bold", color: "green", marginVertical: 8 },
  alertSubText: { fontSize: 14, color: "#555", marginBottom: 16, textAlign: "center" },
  locationBox: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#d0ebff", borderRadius: 8, marginBottom: 16 },
  locationText: { marginLeft: 8, fontSize: 14, color: "#0047AB" },
  cancelButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffe5e5", padding: 12, borderRadius: 8 },
  cancelText: { marginLeft: 8, color: "red", fontWeight: "bold" }
});
