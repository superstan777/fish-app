import * as SQLite from "expo-sqlite";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { PrepareScreen } from "./src/screens/PrepareScreen";
import { PracticeScreen } from "./src/screens/PracticeScreen";
import { MenuBar } from "./src/components/MenuBar";
import { dbCreateTables } from "./src/utility/databaseFunctions/dbCreateTables";
import { dbGetCards } from "./src/utility/databaseFunctions/dbGetCards";
import { updateStreak } from "./src/utility/updateStreak";
import { dbUpdateStreak } from "./src/utility/databaseFunctions/dbUpdateStreak";
import { dbGetStreak } from "./src/utility/databaseFunctions/dbGetStreak";
import { dbGetLostCardsIds } from "./src/utility/databaseFunctions/dbGetLostCardsIds";
import { dbInsertCard } from "./src/utility/databaseFunctions/dbInsertCard";
import { dbDeleteLostCards } from "./src/utility/databaseFunctions/dbDeleteLostCards";
import { formatDate } from "./src/utility/formatDate";
import { addDays } from "./src/utility/addDays";
import { dbInsertStreak } from "./src/utility/databaseFunctions/dbInsertStreak";

export default function App() {
  const db = SQLite.openDatabase("cards213789111911112111.db");
  const [cards, setCards] = useState([]);
  const [screen, setScreen] = useState("prepare");
  const [streak, setStreak] = useState({});
  const [wasDatabaseUpdated, setWasDatabaseUpdated] = useState(false);
  const isMounted = useRef(false);

  const setCardsHandler = async () => {
    const result = await dbGetCards(db);
    setCards(result);
  };

  const deleteLostCards = async () => {
    const arrayOfIds = await dbGetLostCardsIds(db);
    console.log(arrayOfIds.toString());
    dbDeleteLostCards(db, arrayOfIds);
  };
  const setStreakHandler = async () => {
    const result = await dbGetStreak(db);
    if (result === undefined) {
      dbInsertStreak(db);
      const result = await dbGetStreak(db);
      setStreak(result);
    } else setStreak(result);
  };

  useEffect(() => {
    if (!isMounted.current) {
      dbCreateTables(db); // OK
      setCardsHandler();
      deleteLostCards();
      setStreakHandler();

      isMounted.current = true;
    } else {
      // updateStreak(cards, streak, setStreak, db);
    }
  }, [cards]);

  useEffect(() => {
    if (wasDatabaseUpdated) {
      setCardsHandler();
      setWasDatabaseUpdated(false);
    }
  }, [wasDatabaseUpdated]);

  const changeScreenHandler = () => {
    setScreen((prevScreen) =>
      prevScreen === "prepare" ? "practice" : "prepare"
    );
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const cardObject = {
  //       polish: "1234",
  //       english: "1235r",
  //       level: 0,
  //       creationDate: formatDate(new Date("2024-02-20")),
  //       lastPracticeDate: null,
  //       nextPracticeDate: formatDate(new Date("2024-02-20")),
  //     };
  //     console.log(cardObject.nextPracticeDate);
  //     dbInsertCard(db, cardObject);
  //   }
  // }, []);

  const renderSwitch = (param) => {
    switch (param) {
      case "prepare":
        return (
          <PrepareScreen
            cards={cards}
            setWasDatabaseUpdated={setWasDatabaseUpdated}
            db={db}
          />
        );
      case "practice":
        return (
          <PracticeScreen
            cards={cards}
            setWasDatabaseUpdated={setWasDatabaseUpdated}
            db={db}
          />
        );
      default:
        return "default";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuBar
        screenButtonHandler={changeScreenHandler}
        streak={streak.number}
      />
      {renderSwitch(screen)}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
