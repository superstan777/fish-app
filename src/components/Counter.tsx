import { StyleSheet, Text, View } from "react-native";

interface Props {
  currentValue: number;
  maxValue: number;
}

export const Counter: React.FC<Props> = ({ currentValue, maxValue }) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterText}>
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
    fontSize: 24,
    marginBottom: 6,
  },
});
