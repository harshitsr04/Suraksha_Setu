import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useGeolocation = (isActive) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let subscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 1 },
          (loc) => setLocation(loc.coords)
        );
      }
    })();
    return () => subscription?.remove();
  }, [isActive]);

  return { location };
};