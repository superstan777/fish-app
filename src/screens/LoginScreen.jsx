import { View, StyleSheet, Text } from "react-native";
import { InputField } from "../components/InputField";
import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";

export const LoginScreen = ({ changeAuthScreen }) => {
  const { login } = useContext(LoginContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // subbmit login logic to be done

  return (
    <View style={styles.screen}>
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
      <Text>or</Text>
      <Button buttonText="sign up" handler={changeAuthScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
