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

export default function App() {
  const db = SQLite.openDatabase("cards213789119111121.db");
  const [cards, setCards] = useState([]);
  const [screen, setScreen] = useState("prepare");
  const [streak, setStreak] = useState({
    number: 0,
    lastUpdateDate: null,
  });
  const [wasDatabaseUpdated, setWasDatabaseUpdated] = useState(false);
  const isMounted = useRef(false);

  const setCardsHandler = async () => {
    const result = await dbGetCards(db);
    setCards(result);
  };

  // const setStreakHandler = async () => {
  //   const result = await dbGetStreak(db);
  //   console.log(result);
  //   setStreak(result);
  // };

  useEffect(() => {
    if (!isMounted.current) {
      dbCreateTables(db); // OK
      setCardsHandler();

      // setStreakHandler();

      isMounted.current = true;
    } else {
      updateStreak(cards, streak, setStreak, db);
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
