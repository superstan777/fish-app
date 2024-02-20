import { Alert } from "react-native";
export const showAlert = (type) => {
  if (type === "empty") {
    Alert.alert("Input is empty", "type a word", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  } else if (type === "inDB") {
    Alert.alert("Word already in database", "add other word", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  }
};
