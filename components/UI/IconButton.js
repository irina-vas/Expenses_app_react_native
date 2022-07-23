import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const IconButton = ({ name, size, color, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed ? styles.pressed : null}>
      <View style={styles.container}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75
  }
});