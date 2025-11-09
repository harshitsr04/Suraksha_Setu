// app/pages/PermissionsPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Mic, MapPin, Check } from "lucide-react-native";
import { usePermissions } from "../../contexts/permissions-context";
import { Button } from "../ui/button";

export default function PermissionsPage({ onComplete }) {
  const {
    micPermission,
    locationPermission,
    requestMicPermission,
    requestLocationPermission,
  } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRequestMic = async () => {
    setLoading(true);
    const stream = await requestMicPermission();
    if (!stream) {
      setErrors((prev) => ({
        ...prev,
        mic: "Microphone permission denied. Please enable it in settings.",
      }));
    }
    setLoading(false);
  };

  const handleRequestLocation = async () => {
    setLoading(true);
    const granted = await requestLocationPermission();
    if (!granted) {
      setErrors((prev) => ({
        ...prev,
        location: "Location permission denied. Please enable it in settings.",
      }));
    }
    setLoading(false);
  };

  const handleContinue = () => {
    if (micPermission && locationPermission) {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const canContinue = micPermission && locationPermission;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Permissions Required</Text>
      <Text style={styles.subheading}>
        SurakshaSetu needs these permissions to keep you safe
      </Text>

      {/* Microphone Permission */}
      <View
        style={[
          styles.permissionCard,
          micPermission ? styles.permissionGranted : styles.permissionPending,
        ]}
      >
        <View style={styles.permissionRow}>
          <Mic size={24} color={micPermission ? "green" : "#2563EB"} />
          <Text style={styles.permissionTitle}>Microphone</Text>
          {micPermission && <Check size={20} color="green" />}
        </View>
        <Text style={styles.permissionDesc}>
          Allow access to your microphone to listen for your emergency command
        </Text>
        {!micPermission && (
          <>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={handleRequestMic}
              disabled={loading}
            >
              <Text style={styles.enableButtonText}>
                {loading ? "Requesting..." : "Enable Microphone"}
              </Text>
            </TouchableOpacity>
            {errors.mic && <Text style={styles.errorText}>{errors.mic}</Text>}
          </>
        )}
      </View>

      {/* Location Permission */}
      <View
        style={[
          styles.permissionCard,
          locationPermission
            ? styles.permissionGranted
            : styles.permissionPending,
        ]}
      >
        <View style={styles.permissionRow}>
          <MapPin size={24} color={locationPermission ? "green" : "#2563EB"} />
          <Text style={styles.permissionTitle}>Location</Text>
          {locationPermission && <Check size={20} color="green" />}
        </View>
        <Text style={styles.permissionDesc}>
          Allow access to your location to share your location during an
          emergency
        </Text>
        {!locationPermission && (
          <>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={handleRequestLocation}
              disabled={loading}
            >
              <Text style={styles.enableButtonText}>
                {loading ? "Requesting..." : "Enable Location"}
              </Text>
            </TouchableOpacity>
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
          </>
        )}
      </View>

      <Button
        onPress={handleContinue}
        disabled={!canContinue}
        style={[styles.continueButton, !canContinue && styles.disabledButton]}
      >
        Continue to Voice Setup
      </Button>

      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>Both permissions are required to proceed</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f0f4f8", flexGrow: 1 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#2563EB", textAlign: "center", marginBottom: 4 },
  subheading: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 16 },
  permissionCard: { padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 2 },
  permissionGranted: { backgroundColor: "#ECFDF5", borderColor: "#34D399" },
  permissionPending: { backgroundColor: "#fff", borderColor: "#D1D5DB" },
  permissionRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  permissionTitle: { fontSize: 18, fontWeight: "600", flex: 1 },
  permissionDesc: { fontSize: 14, color: "#555", marginBottom: 8 },
  enableButton: { backgroundColor: "#2563EB", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  enableButtonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", marginTop: 4 },
  continueButton: { backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginBottom: 8 },
  disabledButton: { backgroundColor: "#A5B4FC" },
  skipButton: { alignItems: "center", marginBottom: 16 },
  skipText: { color: "#2563EB", fontWeight: "600" },
  noteText: { textAlign: "center", color: "#555", fontSize: 12 },
});
