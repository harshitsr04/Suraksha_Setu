// App.js
import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

// Pages (under components/pages)
import SplashScreen from "./components/pages/splash-screen.jsx";
import AuthPage from "./components/pages/auth-page.jsx";
import PermissionsPage from "./components/pages/permissions-page.js";
import DashboardScreen from "./screens/DashboardScreen";

// Context Providers
import { AuthProvider } from "./contexts/auth-context";
import { AlertProvider } from "./contexts/alert-context";
import { ContactsProvider } from "./contexts/contacts-context";
import {
  PermissionsProvider,
  usePermissions,
} from "./contexts/permissions-context";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [usernameSet, setUsernameSet] = useState(false);

  return (
    <PermissionsProvider>
      <AuthProvider>
        <ContactsProvider>
          <AlertProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar barStyle="dark-content" />
              {!splashDone ? (
                <SplashScreen onComplete={() => setSplashDone(true)} />
              ) : !usernameSet ? (
                <AuthPage onComplete={() => setUsernameSet(true)} />
              ) : (
                <AppFlow />
              )}
            </SafeAreaView>
          </AlertProvider>
        </ContactsProvider>
      </AuthProvider>
    </PermissionsProvider>
  );
}

// Handles permission flow + dashboard
function AppFlow() {
  const { micPermissionGranted, locationPermissionGranted } = usePermissions();
  const [permissionsDone, setPermissionsDone] = useState(false);

  // If permissions not granted yet, show PermissionsPage
  if (!permissionsDone && (!micPermissionGranted || !locationPermissionGranted)) {
    return <PermissionsPage onComplete={() => setPermissionsDone(true)} />;
  }

  // All done → show main dashboard
  return <DashboardScreen />;
}
