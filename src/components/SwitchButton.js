import { StyleSheet, Button, View } from "react-native";
export const SwitchButton = ({ buttonHandler }) => {
  return (
    <View style={styles.button}>
      <Button color="#007AFF" title="switch" onPress={buttonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {},
});
