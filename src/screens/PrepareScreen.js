import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { NewWordsIndicator } from "../components/NewWordsIndicator";
import { formatDate } from "../utility/formatDate";
import { showAlert } from "../utility/showAlert";
import { dbInsertCard } from "../utility/databaseFunctions/dbInsertCard";
import { isStringEmpty } from "../utility/isStringEmpty";
import { dbIsCardExisting } from "../utility/databaseFunctions/dbIsCardExisting";
import { createCardObject } from "../utility/createCardObject";

export const PrepareScreen = ({ cards, setWasDatabaseUpdated, db }) => {
  const [textInput, setTextInput] = useState("");

  const cardsCreatedToday = cards.filter(
    (obj) => obj.creationDate === formatDate(new Date())
  );

  const onSubmitEditing = async () => {
    if (isStringEmpty(textInput)) {
      showAlert("empty");
      setTextInput("");
      return;
    }

    try {
      const isWordInDatabase = await dbIsCardExisting(db, textInput);

      if (isWordInDatabase) {
        showAlert("inDB");
        setTextInput("");
        return;
      }
      const newCardObject = await createCardObject(textInput);

      if (!isWordInDatabase) {
        dbInsertCard(db, newCardObject);
        setWasDatabaseUpdated(true);
        setTextInput("");
      }
    } catch (error) {
      console.error(`onSubmitEditing error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <NewWordsIndicator newWordsCounter={cardsCreatedToday.length} />
      <View style={styles.card}>
        <Text style={styles.cardText}>dodaj słowo</Text>
        <TextInput
          style={[styles.input, styles.cardText]}
          onChangeText={setTextInput}
          placeholder="np. krzesło"
          value={textInput}
          autoFocus={true}
          blurOnSubmit={false}
          autoCapitalize="none"
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 300,
    height: 450,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 180,
    textAlign: "center",
  },
  cardText: {
    fontSize: 24,
  },
});
