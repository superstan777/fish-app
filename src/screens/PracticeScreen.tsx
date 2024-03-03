import { StyleSheet, View, Text } from "react-native";
import { Counter } from "../components/Counter";
import { formatDate } from "../utility/formatDate";
import { Card } from "../components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect, SetStateAction } from "react";
import { TextToSpeechButton } from "../components/TextToSpeechButton";
import { CardInterface } from "../Interfaces";

interface Props {
  database: any;
  cards: CardInterface[];
  setWasDatabaseUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PracticeScreen: React.FC<Props> = ({
  database,
  cards,
  setWasDatabaseUpdated,
}) => {
  const [currentText, setCurrentText] = useState<string>("current text");

  const cardsDoneToday: CardInterface[] = cards.filter(
    (obj) => obj.lastPracticeDate === formatDate(new Date())
  );
  const todayPracticeCards: CardInterface[] = cards.filter(
    (obj) => obj.nextPracticeDate === formatDate(new Date())
  );

  useEffect(() => {
    currentTextHandler();
  }, [cards]);

  const currentTextHandler = (): void => {
    if (todayPracticeCards.length === 0) {
      setCurrentText("no more cards");
    } else {
      setCurrentText(todayPracticeCards[todayPracticeCards.length - 1].english);
    }
  };

  const renderPracticeCards = (): React.JSX.Element | React.JSX.Element[] => {
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
          cardData={card}
          setWasDatabaseUpdated={setWasDatabaseUpdated}
          database={database}
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
