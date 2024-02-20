import { View, Text, StyleSheet } from "react-native";
import { SwitchButton } from "./SwitchButton";

export const MenuBar = ({ screenButtonHandler, streak }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Text style={styles.text}>Streak: {streak}</Text>
        {/* <Text style={styles.text}>English</Text> */}
      </View>
      <View style={styles.containerItem}>
        <SwitchButton buttonHandler={screenButtonHandler} />
      </View>
      <View style={styles.containerItem}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerItem: {
    height: 42,
    width: 80,
    color: "white",
    marginHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  text: {},
});
