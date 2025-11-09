"use client";

import React, { useEffect, useState } from "react";

// ✅ Contexts
import { AuthProvider, useAuth } from "../contexts/auth-context";
import { PermissionsProvider } from "../contexts/permissions-context";
import { VoiceProvider } from "../contexts/voice-context";
import { ContactsProvider } from "../contexts/contacts-context";
import { AlertProvider } from "../contexts/alert-context";

// ✅ Pages (since they are inside components/pages/)
import SplashScreen from "./pages/splash-screen";
import AuthPage from "./pages/auth-page";
import PermissionsPage from "./pages/permissions-page.js";
import VoiceSetupPage from "./pages/voice-setup-page";
import ContactsSetupPage from "./pages/contacts-setup-page";
import DashboardScreen from "../screens/DashboardScreen";

// ✅ UI / Theming
import { ThemeProvider } from "./theme-provider";
import { ThemedText } from "./themed-text";

export function AppLayout() {
  const [currentPage, setCurrentPage] = useState("splash");

  return (
    <ThemeProvider>
      <AuthProvider>
        <PermissionsProvider>
          <VoiceProvider>
            <ContactsProvider>
              <AlertProvider>
                <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </AlertProvider>
            </ContactsProvider>
          </VoiceProvider>
        </PermissionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent({ currentPage, setCurrentPage }) {
  const { isAuthenticated } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated) {
      const voiceSetupComplete = localStorage.getItem("voiceSetupComplete");
      const contactsSetupComplete = localStorage.getItem("contactsSetupComplete");
      const permissionsGranted = localStorage.getItem("permissionsGranted");

      if (!permissionsGranted) {
        setCurrentPage("permissions");
      } else if (!voiceSetupComplete) {
        setCurrentPage("voice-setup");
      } else if (!contactsSetupComplete) {
        setCurrentPage("contacts-setup");
      } else {
        setCurrentPage("dashboard");
      }
    } else {
      if (currentPage !== "auth") {
        setCurrentPage("splash");
      }
    }
  }, [isAuthenticated, isHydrated, currentPage, setCurrentPage]);

  if (!isHydrated) return null;

  switch (currentPage) {
    case "splash":
      return <SplashScreen onComplete={() => setCurrentPage("auth")} />;
    case "auth":
      return <AuthPage onComplete={() => setCurrentPage("permissions")} />;
    case "permissions":
      return <PermissionsPage onComplete={() => setCurrentPage("voice-setup")} />;
    case "voice-setup":
      return <VoiceSetupPage onComplete={() => setCurrentPage("contacts-setup")} />;
    case "contacts-setup":
      return <ContactsSetupPage onComplete={() => setCurrentPage("dashboard")} />;
    case "dashboard":
      return (
        <>
          <ThemedText type="title">Welcome Back!</ThemedText>
          <DashboardScreen />
        </>
      );
    default:
      return <SplashScreen onComplete={() => setCurrentPage("auth")} />;
  }
}