import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti"; // Framer-motion alternative for React Native

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      {/* Icon Animation */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 800 }}
        style={styles.iconContainer}
      >
        <MaterialIcons name="security" size={100} color="#fff" />
        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1500 }}
          style={styles.heartOverlay}
        >
          <Feather name="heart" size={50} color="#ff6b6b" />
        </MotiView>
      </MotiView>

      {/* Text Section */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, duration: 600 }}
      >
        <Text style={styles.title}>SurakshaSetu</Text>
        <Text style={styles.subtitle}>Your Voice, Your Safety</Text>
      </MotiView>

      {/* Loading Dots */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1500,
              delay: i * 200,
              loop: true,
            }}
            style={styles.dot}
          />
        ))}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "relative",
    marginBottom: 30,
  },
  heartOverlay: {
    position: "absolute",
    top: 25,
    left: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    marginTop: 5,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 60,
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
