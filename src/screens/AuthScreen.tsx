import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";

type AuthScreenType = "login" | "signup";

export const AuthScreen: React.FC = () => {
  const [authScreen, setAuthScreen] = useState<AuthScreenType>("login");

  const changeAuthScreen = (): void => {
    setAuthScreen((prevScreen) =>
      prevScreen === "login" ? "signup" : "login"
    );
  };

  const renderAuthScreen = (param: AuthScreenType): JSX.Element => {
    switch (param) {
      case "login":
        return <LoginScreen changeAuthScreen={changeAuthScreen} />;
      case "signup":
        return <SignUpScreen changeAuthScreen={changeAuthScreen} />;
      default:
        throw new Error("Invalid auth screen type");
    }
  };

  return <View style={styles.loginScreen}>{renderAuthScreen(authScreen)}</View>;
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
});
