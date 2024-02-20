import { StyleSheet, Text, View } from "react-native";

export const NewWordsIndicator = ({ newWordsCounter }) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterText}>{newWordsCounter} new today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterText: {
    fontSize: 24,
  },
  counter: {
    padding: 12,
    fontSize: "24px",
    marginBottom: 6,
  },
});
