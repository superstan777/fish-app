import { Alert } from "react-native";
export const showAlert = (type) => {
  const buttonObject = {
    text: "OK",
    style: "cancel",
  };
  if (type === "empty") {
    Alert.alert("Input is empty", "type a word", [buttonObject]);
  } else if (type === "inDB") {
    Alert.alert("Word already in database", "add other word", [buttonObject]);
  } else if (type === "noAccount") {
    Alert.alert("No user", "check username or password", [buttonObject]);
  }
};
