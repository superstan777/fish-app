import { Alert } from "react-native";

export const showAlert = (
  type:
    | "empty"
    | "inDB"
    | "noAccount"
    | "accountInDatabase"
    | "passwordsNotTheSame"
) => {
  interface AlertButton {
    text: string;
    style: "default" | "cancel" | "destructive";
  }
  const buttons: AlertButton[] = [
    {
      text: "OK",
      style: "cancel",
    },
  ];

  if (type === "empty") {
    Alert.alert("Input is empty", "type a word", buttons);
  } else if (type === "inDB") {
    Alert.alert("Word already in database", "add other word", buttons);
  } else if (type === "noAccount") {
    Alert.alert("No user found", "check username or password", buttons);
  } else if (type === "accountInDatabase") {
    Alert.alert("User exists", "log in or select different username", buttons);
  } else if (type === "passwordsNotTheSame") {
    Alert.alert(
      "Passwords are not the same",
      "Password fields differs",
      buttons
    );
  }
};
