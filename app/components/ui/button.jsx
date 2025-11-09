import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// Utility for combining styles (replacement for `cn`)
const cn = (...classes) => classes.filter(Boolean);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false, // ignored in RN, but kept for structure
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        ...(Array.isArray(className) ? className : [className]),
      ]}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  // Variants
  default: {
    backgroundColor: "#2563eb", // Blue
  },
  destructive: {
    backgroundColor: "#dc2626", // Red
  },
  outline: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "transparent",
  },
  secondary: {
    backgroundColor: "#6b7280", // Gray
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
  // Sizes
  defaultSize: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Button };
