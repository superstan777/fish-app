import { StyleSheet, Text, View, Pressable } from "react-native";

export const Button = ({ buttonText, handler }) => {
  return (
    <Pressable onPress={handler}>
      <View style={styles.button}>
        <Text style={styles.text}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginBottom: 16,
    width: 80,
    height: 50,
    backgroundColor: "#4287f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  text: {
    color: "white",
  },
});
