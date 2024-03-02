import { Pressable, Keyboard, StyleSheet, Text } from "react-native";
import { InputField } from "../components/InputField";
import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { LoginContext } from "../context/LoginContext";
import { DUMMYDB } from "../DUMMMYDB";
import { showAlert } from "../utility/showAlert";

interface Props {
  changeAuthScreen: () => void;
}

export const LoginScreen: React.FC<Props> = ({ changeAuthScreen }) => {
  const { login } = useContext(LoginContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const isPasswordCorrect = (username: string, password: string): boolean => {
    const userIndex: number = DUMMYDB.findIndex(
      (obj) => obj.username === username
    );
    if (userIndex !== -1 && DUMMYDB[userIndex].password === password) {
      return true;
    } else return false;
  };

  const onSubmit = (): void => {
    if (isPasswordCorrect(username, password)) {
      login();
    } else {
      showAlert("noAccount");
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

      <Button buttonText="login" handler={onSubmit} type="default" />
      <Text>or</Text>
      <Button buttonText="sign up" handler={changeAuthScreen} type="ghost" />
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
