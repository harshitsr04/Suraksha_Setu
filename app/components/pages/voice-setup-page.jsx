// app/pages/VoiceSetupPage.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Mic2, Volume2 } from "lucide-react-native";
import { Button } from "../ui/button";
import { useVoiceRecognition } from "../../hooks/use-voice-recognition";
import { useLoudnessDetection } from "../../hooks/use-loudness-detection";
import { usePermissions } from "../../contexts/permissions-context";

export default function VoiceSetupPage({ onComplete }) {
  const [successCount, setSuccessCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { micStream } = usePermissions();
  const { isListening, triggerDetected, setTriggerDetected, startListening, stopListening } =
    useVoiceRecognition();
  const { loudness, isAboveThreshold } = useLoudnessDetection(isRecording ? micStream : null);

  useEffect(() => {
    let timer;
    if (feedback) { 
      timer = setTimeout(() => setFeedback(""), 2000);
    }
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleStartRecording = () => {
    setIsRecording(true);
    startListening();
    setFeedback("Listening...");
  };

  const handleStopRecording = () => {
    const wasAboveThreshold = isAboveThreshold;
    setIsRecording(false);
    stopListening();

    setTimeout(() => {
      if (triggerDetected && wasAboveThreshold) {
        setSuccessCount((prev) => prev + 1);
        setFeedback("✓ Voice command captured!");
      } else if (!wasAboveThreshold) {
        setFeedback("Not loud enough. Please speak louder!");
      } else if (!triggerDetected) {
        setFeedback('Phrase "Sanket Go" not detected. Try again.');
      }
      setTriggerDetected(false);
    }, 100);
  };

  const handleContinue = async () => {
    if (successCount >= 3) {
      await AsyncStorage.setItem("voiceSetupComplete", "true");
      onComplete();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("voiceSetupComplete", "true");
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Voice Command Setup</Text>
      <Text style={styles.subheading}>
        Train your emergency voice command for hands-free activation
      </Text>

      <View style={styles.instructionBox}>
        <Text style={styles.instructionTitle}>Command to say:</Text>
        <Text style={styles.instructionCommand}>Sanket Go</Text>
        <Text style={styles.instructionDesc}>Speak clearly and loudly (min 75 dB)</Text>
      </View>

      <View style={styles.micContainer}>
        <TouchableOpacity
          style={[
            styles.micButton,
            isRecording && styles.micButtonActive,
          ]}
          onPressIn={handleStartRecording}
          onPressOut={handleStopRecording}
        >
          <Mic2 size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.micText}>
          {isRecording ? "Hold and speak... Release when done" : "Press and hold to record"}
        </Text>

        {/* Loudness Meter */}
        <View style={styles.meterContainer}>
          <View
            style={[
              styles.meterFill,
              {
                width: `${Math.min(loudness, 100)}%`,
                backgroundColor: isAboveThreshold
                  ? "green"
                  : loudness > 50
                  ? "yellow"
                  : "red",
              },
            ]}
          />
        </View>
        <View style={styles.meterTextContainer}>
          <Volume2 size={16} color="#555" />
          <Text style={styles.meterText}>
            {loudness.toFixed(0)} dB {isAboveThreshold ? "(Good!)" : "(Too quiet)"}
          </Text>
        </View>
      </View>

      {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}

      <View style={styles.progressContainer}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.progressCircle,
              i < successCount ? styles.progressCircleActive : styles.progressCircleInactive,
            ]}
          >
            <Text style={i < successCount ? styles.progressTextActive : styles.progressTextInactive}>
              {i < successCount ? "✓" : i + 1}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.progressLabel}>{successCount} of 3 samples captured</Text>

      <Button
        onPress={handleContinue}
        disabled={successCount < 3}
        style={[styles.continueButton, successCount < 3 && styles.disabledButton]}
      >
        Continue ({successCount}/3)
      </Button>

      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f8", alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold", color: "#2563EB", marginBottom: 4, textAlign: "center" },
  subheading: { fontSize: 14, color: "#555", marginBottom: 16, textAlign: "center" },
  instructionBox: { backgroundColor: "#DBEAFE", padding: 12, borderRadius: 10, marginBottom: 16, width: "100%", alignItems: "center" },
  instructionTitle: { fontWeight: "600", color: "#1E40AF" },
  instructionCommand: { fontSize: 20, fontWeight: "bold", color: "#2563EB" },
  instructionDesc: { fontSize: 12, color: "#1E3A8A", marginTop: 4 },
  micContainer: { alignItems: "center", marginBottom: 16, width: "100%" },
  micButton: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#DC2626", alignItems: "center", justifyContent: "center" },
  micButtonActive: { shadowColor: "#DC2626", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 20 },
  micText: { marginTop: 8, fontSize: 14, color: "#555", textAlign: "center" },
  meterContainer: { width: "80%", height: 10, backgroundColor: "#E5E7EB", borderRadius: 5, marginTop: 12, overflow: "hidden" },
  meterFill: { height: "100%", borderRadius: 5 },
  meterTextContainer: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  meterText: { fontSize: 12, color: "#555" },
  feedbackText: { backgroundColor: "#DBEAFE", padding: 8, borderRadius: 8, marginVertical: 8, textAlign: "center", color: "#1E40AF", fontWeight: "600" },
  progressContainer: { flexDirection: "row", gap: 8, marginBottom: 4 },
  progressCircle: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  progressCircleActive: { backgroundColor: "green" },
  progressCircleInactive: { backgroundColor: "#D1D5DB" },
  progressTextActive: { color: "#fff", fontWeight: "bold" },
  progressTextInactive: { color: "#4B5563", fontWeight: "bold" },
  progressLabel: { fontSize: 12, color: "#555", marginBottom: 12 },
  continueButton: { width: "100%", marginBottom: 8 },
  disabledButton: { backgroundColor: "#A5B4FC" },
  skipText: { color: "#2563EB", fontWeight: "600" },
});
