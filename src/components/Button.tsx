import { StyleSheet, Text, View, Pressable } from "react-native";

interface Props {
  buttonText: string;
  handler: () => void;
  type: "default" | "ghost";
}

export const Button: React.FC<Props> = ({
  buttonText,
  handler,
  type,
}): React.JSX.Element => {
  const renderButton = () => {
    if (type === "default") {
      return (
        <View style={styles.buttonDefault}>
          <Text style={styles.buttonTextDefault}>{buttonText}</Text>
        </View>
      );
    } else if (type === "ghost") {
      return (
        <View style={styles.buttonGhost}>
          <Text style={styles.buttonTextGhost}>{buttonText}</Text>
        </View>
      );
    }
  };
  return <Pressable onPress={handler}>{renderButton()}</Pressable>;
};

const styles = StyleSheet.create({
  buttonDefault: {
    marginTop: 16,
    marginBottom: 16,
    width: 80,
    height: 50,
    backgroundColor: "#4287f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonTextDefault: {
    color: "white",
  },
  buttonGhost: {
    marginTop: 16,
    marginBottom: 16,
    width: 80,
    height: 50,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextGhost: {
    color: "black",
  },
});
