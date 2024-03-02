import { View, StyleSheet, Text, Pressable, Keyboard } from "react-native";
import { InputField } from "../components/InputField";
import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";
import { DUMMYDB } from "../DUMMMYDB";
import { showAlert } from "../utility/showAlert";

export const SignUpScreen = ({ changeAuthScreen }) => {
  const { login } = useContext(LoginContext);

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repassword, setRepassword] = useState<string>();

  const isUserInDatabase = (username: string): boolean => {
    return DUMMYDB.some((obj) => obj.username === username);
  };

  const isPasswordCorrect = (): boolean => {
    if (password === repassword) {
      return true;
    } else return false;
  };

  const onSubmit = (): void => {
    if (
      username === undefined ||
      password === undefined ||
      repassword === undefined
    ) {
      showAlert("empty");
      return;
    }

    if (isUserInDatabase(username)) {
      showAlert("accountInDatabase");
      return;
    }
    if (isPasswordCorrect()) {
      showAlert("passwordsNotTheSame");
      return;
    }
    if (!isUserInDatabase(username) && password === repassword) {
      DUMMYDB.push({ username, password });
      login();
    }
  };

  return (
    <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()}>
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
      <Button buttonText="sign up" handler={onSubmit} type="default" />
      <Text>or</Text>
      <Button buttonText="login" handler={changeAuthScreen} type="ghost" />
    </Pressable>
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
    width: "100%",
  },
});
