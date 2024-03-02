import { useState } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-speech";

//english word should be passed
//both words should be passed

interface Props {
  word: string;
}

export const TextToSpeechButton: React.FC<Props> = ({ word }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const onStart = (): void => {
    setIsSpeaking(true);
    console.log("speaking");
  };
  const onDone = (): void => {
    setIsSpeaking(false);
    console.log("done");
  };

  const onPressHandler = (): void => {
    Speech.stop();
    Speech.speak(word, {
      language: "en",
      onStart: onStart,
      onDone: onDone,
    });
  };

  const styles = StyleSheet.create({
    button: {
      marginBottom: 16,
      width: 80,
      height: 50,
      backgroundColor: isSpeaking ? "#3061b0" : "#4287f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },

    text: {
      color: "white",
    },
  });
  return (
    <Pressable onPress={onPressHandler}>
      <View style={styles.button}>
        <Text style={styles.text}>{isSpeaking ? "speaking" : "speak"}</Text>
      </View>
    </Pressable>
  );
};
