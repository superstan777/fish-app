import { TextInput, StyleSheet } from "react-native";

export const InputField = ({ text, setText, placeholder }) => {
  //type to be added
  return (
    <TextInput
      style={styles.input}
      onChangeText={setText}
      placeholder={placeholder}
      value={text}
      blurOnSubmit={false}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 180,
    textAlign: "center",
    fontSize: 24,
  },
});
