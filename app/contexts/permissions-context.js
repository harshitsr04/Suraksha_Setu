// app/contexts/permissions-context.js
import { Audio } from "expo-av";
import { createContext, useContext, useEffect, useState } from "react";

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [micPermission, setMicPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [micStream, setMicStream] = useState(null);

  // Request microphone permission
  const requestMicPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === "granted") {
        setMicPermission(true);
        const recording = new Audio.Recording();
        // Optional: prepare to record if needed
        // await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
        setMicStream(recording);
        return recording;
      } else {
        setMicPermission(false);
        return null;
      }
    } catch (err) {
      console.error("Mic permission error:", err);
      return null;
    }
  };

  // Placeholder for location permission
  // You can replace with expo-location or react-native-permissions later
  const requestLocationPermission = async () => {
    try {
      // For now, just simulate granting permission
      setLocationPermission(true);
      return true;
    } catch (err) {
      console.error("Location permission error:", err);
      setLocationPermission(false);
      return false;
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        micPermission,
        locationPermission,
        micStream,
        requestMicPermission,
        requestLocationPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
