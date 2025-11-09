import { useEffect } from "react";
import * as Location from "expo-location";
import { sendLocation } from "../api/index";

/**
 * Send user live location every 5 seconds
 */
export const useLiveLocation = (userId) => {
  useEffect(() => {
    let interval;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      interval = setInterval(async () => {
        try {
          const loc = await Location.getCurrentPositionAsync({});
          await sendLocation(userId, loc.coords.latitude, loc.coords.longitude);
        } catch (err) {
          console.error("Error sending location:", err.message);
        }
      }, 5000);
    };

    startTracking();

    return () => clearInterval(interval);
  }, [userId]);
};
