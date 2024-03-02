import * as SQLite from "expo-sqlite";
import { useState, useEffect, useRef, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { PrepareScreen } from "./src/screens/PrepareScreen";
import { PracticeScreen } from "./src/screens/PracticeScreen";
import { MenuBar } from "./src/components/MenuBar";
import { dbCreateTables } from "./src/utility/databaseFunctions/dbCreateTables";
import { dbGetCards } from "./src/utility/databaseFunctions/dbGetCards";
import { updateStreak } from "./src/utility/updateStreak";
import { dbGetStreak } from "./src/utility/databaseFunctions/dbGetStreak";
// import { dbGetLostCardsIds } from "./src/utility/databaseFunctions/dbGetLostCardsIds";
// import { dbInsertCard } from "./src/utility/databaseFunctions/dbInsertCard";
// import { dbDeleteLostCards } from "./src/utility/databaseFunctions/dbDeleteLostCards";
import { LoginContext } from "./src/context/LoginContext";
import { dbInsertStreak } from "./src/utility/databaseFunctions/dbInsertStreak";
import { AuthScreen } from "./src/screens/AuthScreen";

export default function App() {
  const db = SQLite.openDatabase("cards213789111911112111.db");
  const [cards, setCards] = useState([]);
  const [screen, setScreen] = useState("prepare");
  const [streak, setStreak] = useState({});
  const [wasDatabaseUpdated, setWasDatabaseUpdated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMounted = useRef(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const setCardsHandler = async () => {
    const result = await dbGetCards(db);
    setCards(result);
  };

  // const deleteLostCards = async () => {
  //   const arrayOfIds = await dbGetLostCardsIds(db);
  //   console.log(arrayOfIds.toString());
  //   dbDeleteLostCards(db, arrayOfIds);
  // };
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
      // deleteLostCards();
      setStreakHandler();

      isMounted.current = true;
    } else {
      updateStreak(cards, streak, db, setWasDatabaseUpdated);
    }
  }, [cards]);

  useEffect(() => {
    if (wasDatabaseUpdated) {
      setCardsHandler();
      setStreakHandler();
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
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      <SafeAreaView style={styles.container}>
        {!isLoggedIn ? (
          <AuthScreen />
        ) : (
          <View>
            <MenuBar
              screenButtonHandler={changeScreenHandler}
              streak={streak.number}
            />
            {renderSwitch(screen)}
          </View>
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </LoginContext.Provider>
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
