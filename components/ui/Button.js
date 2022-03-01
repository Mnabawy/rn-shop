import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const CustomButton = props => {
  const { onPress, title } = props;
  return (
    <Pressable style={{ ...styles.button, ...props.style }} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CustomButton;
