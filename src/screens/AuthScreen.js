import { View, StyleSheet, Text } from "react-native";
import { Button } from "../components/Button";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { InputField } from "../components/InputField";

export const AuthScreen = () => {
  const { login } = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.loginScreen}>
      <InputField
        text={username}
        setText={setUsername}
        placeholder="username"
      />
      <InputField
        text={password}
        setText={setPassword}
        placeholder="password"
      />
      <Button buttonText="login" handler={() => login()} />
      {/* <Text>or</Text>
      <Button buttonText="sign up" handler={() => login()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
