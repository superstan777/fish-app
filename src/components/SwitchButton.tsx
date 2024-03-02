import { StyleSheet, Button, View } from "react-native";

interface Props {
  buttonHandler: () => void;
}
export const SwitchButton: React.FC<Props> = ({ buttonHandler }) => {
  return (
    <View style={styles.button}>
      <Button color="#007AFF" title="switch" onPress={buttonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {},
});
