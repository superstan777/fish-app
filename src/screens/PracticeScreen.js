import { StyleSheet, View, Text } from "react-native";
import { Counter } from "../components/Counter";
import { formatDate } from "../utility/formatDate";
import { Card } from "../components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TextToSpeechButton } from "../components/TextToSpeechButton";

export const PracticeScreen = ({ cards, setCards, db }) => {
  const [currentText, setCurrentText] = useState("current text");

  const cardsDoneToday = cards.filter(
    (obj) => obj.lastPracticeDate === formatDate(new Date())
  );
  const todayPracticeCards = cards.filter(
    (obj) => obj.nextPracticeDate === formatDate(new Date())
  );

  useEffect(() => {
    currentTextHandler();
  }, [cards]);

  const currentTextHandler = () => {
    if (todayPracticeCards.length === 0) {
      setCurrentText("no more cards");
    } else {
      setCurrentText(todayPracticeCards[todayPracticeCards.length - 1].english);
    }
  };

  const renderPracticeCards = () => {
    if (todayPracticeCards.length === 0) {
      return (
        <View>
          <Text style={styles.finalMessage}>
            Come back tomorrow or add more words
          </Text>
          <Text style={styles.finalMessage}>
            Wróć jutro lub dodaj więcej kart
          </Text>
        </View>
      );
    } else {
      // obecnie 3 karty, moze ich byc 20 - chcemy renderować tylko 2 z 2
      return todayPracticeCards.map((card, index) => (
        <Card
          key={index}
          index={index}
          cardData={card}
          cards={cards}
          setCards={setCards}
          db={db}
        />
      ));
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Counter
          currentValue={cardsDoneToday.length}
          maxValue={cardsDoneToday.length + todayPracticeCards.length}
        />
        <TextToSpeechButton word={currentText} />
        {renderPracticeCards()}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  finalMessage: {
    textAlign: "center",
  },
});
