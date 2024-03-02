import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";

export const AuthScreen = () => {
  const [authScreen, setAuthScreen] = useState("login");

  const changeAuthScreen = () => {
    setAuthScreen((prevScreen) =>
      prevScreen === "login" ? "signup" : "login"
    );
  };

  const renderAuthScreen = (param) => {
    switch (param) {
      case "login":
        return <LoginScreen changeAuthScreen={changeAuthScreen} />;
      case "signup":
        return <SignUpScreen changeAuthScreen={changeAuthScreen} />;
      default:
        return "login";
    }
  };

  return <View style={styles.loginScreen}>{renderAuthScreen(authScreen)}</View>;
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
});
