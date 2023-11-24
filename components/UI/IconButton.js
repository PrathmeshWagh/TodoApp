import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress} >
      <View>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7
  }
})