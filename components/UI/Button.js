import { Text, View, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ onPress, children }) {
  return (
    <View style={styles.button}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
  pressed: {
    opacity: 0.75,
  }


})