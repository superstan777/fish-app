import { View, StyleSheet, Text } from "react-native";
import { InputField } from "../components/InputField";
import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";

export const SignUpScreen = ({ changeAuthScreen }) => {
  const { login } = useContext(LoginContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();

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
      <InputField
        text={repassword}
        setText={setRepassword}
        placeholder="re-password"
      />
      <Button buttonText="sign up" handler={() => login()} />
      <Text>or</Text>
      <Button buttonText="login" handler={changeAuthScreen} />
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
