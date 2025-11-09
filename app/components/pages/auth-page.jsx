import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth-context";


import { MotiView } from "moti";

export default function AuthPage({ onComplete }) {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ""));

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = () => {
    setErrors({});
    const newErrors = {};

    if (isSignUp) {
      if (!formData.username || formData.username.length < 3)
        newErrors.username = "Username must be at least 3 characters";
      if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
      if (!validatePhone(formData.phone)) newErrors.phone = "Phone must be 10 digits";
      if (!validatePassword(formData.password))
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      if (Object.keys(newErrors).length === 0) {
        setLoading(true);
        setTimeout(() => {
          signup({
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          });
          setLoading(false);
          onComplete?.();
        }, 1000);
      }
    } else {
      if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
      if (!formData.password) newErrors.password = "Password required";

      if (Object.keys(newErrors).length === 0) {
        setLoading(true);
        setTimeout(() => {
          login({
            id: "user_" + Math.random().toString(36).substr(2, 9),
            username: formData.email.split("@")[0],
            email: formData.email,
            phone: "",
            token: "mock_token_" + Math.random().toString(36).substr(2, 9),
          });
          setLoading(false);
          onComplete?.();
        }, 1000);
      }
    }

    setErrors(newErrors);
  };

  const handleContinueAsGuest = () => {
    login({
      id: "guest_" + Math.random().toString(36).substr(2, 9),
      username: "Guest User",
      email: "guest@surakshasetu.app",
      phone: "",
      token: "guest_token_" + Math.random().toString(36).substr(2, 9),
    });
    onComplete?.();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8faff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 700 }}
          style={styles.card}
        >
          <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
          <Text style={styles.subtitle}>
            {isSignUp ? "Set up your SurakshaSetu account" : "Sign in to your account"}
          </Text>

          {/* Username */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Feather name="user" size={20} color="#888" style={styles.icon} />
              <TextInput
                placeholder="Username"
                value={formData.username}
                onChangeText={(v) => setFormData({ ...formData, username: v })}
                style={[styles.input, errors.username && styles.errorInput]}
              />
              {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(v) => setFormData({ ...formData, email: v })}
              style={[styles.input, errors.email && styles.errorInput]}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Phone */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Feather name="phone" size={20} color="#888" style={styles.icon} />
              <TextInput
                placeholder="Phone (10 digits)"
                keyboardType="phone-pad"
                maxLength={10}
                value={formData.phone}
                onChangeText={(v) => setFormData({ ...formData, phone: v })}
                style={[styles.input, errors.phone && styles.errorInput]}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
          )}

          {/* Password */}
          <View style={styles.inputGroup}>
            <Feather name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(v) => setFormData({ ...formData, password: v })}
              style={[styles.input, errors.password && styles.errorInput]}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Feather name="lock" size={20} color="#888" style={styles.icon} />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(v) => setFormData({ ...formData, confirmPassword: v })}
                style={[styles.input, errors.confirmPassword && styles.errorInput]}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
          )}

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "#999" }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={handleContinueAsGuest}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* Toggle */}
          <TouchableOpacity
            onPress={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
            }}
            style={{ marginTop: 16 }}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? "Already have an account? Sign In" : "Don’t have an account? Create One"}
            </Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#0047AB", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  inputGroup: { marginBottom: 12 },
  icon: { position: "absolute", left: 10, top: 14 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 38,
    paddingRight: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#0047AB",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  guestButton: {
    backgroundColor: "#666",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  guestText: { color: "white", textAlign: "center", fontWeight: "bold" },
  toggleText: { color: "#0047AB", textAlign: "center", fontWeight: "600" },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
  errorInput: { borderColor: "red" },
});