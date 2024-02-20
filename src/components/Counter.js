import { StyleSheet, Text, View } from "react-native";
export const Counter = ({ currentValue, maxValue }) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterText}>
        {/* 1/10 */}
        {currentValue}/{maxValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterText: {
    fontSize: 24,
    textAlign: "center",
  },
  counter: {
    padding: 12,
    fontSize: "24px",
    marginBottom: 6,
  },
});
