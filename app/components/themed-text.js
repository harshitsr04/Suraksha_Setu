import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "./theme-provider";

export const ThemedText = ({ children, type, style, ...props }) => {
  const { theme } = useTheme();

  const textStyle = [
    styles.base,
    type === "title" && styles.title,
    type === "link" && styles.link,
    theme === "dark" ? styles.dark : styles.light,
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  link: {
    color: "#1e90ff",
  },
  light: {
    color: "#000",
  },
  dark: {
    color: "#fff",
  },
});
