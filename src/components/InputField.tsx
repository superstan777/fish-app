import { TextInput, StyleSheet } from "react-native";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}
export const InputField: React.FC<Props> = ({ text, setText, placeholder }) => {
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
