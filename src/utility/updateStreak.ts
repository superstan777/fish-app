import { formatDate } from "./formatDate";
import { dbUpdateStreak } from "./databaseFunctions/dbUpdateStreak";
import { addDays } from "./addDays";
import { CardInterface, StreakInterface } from "../Interfaces";

export const updateStreak = (
  cards: CardInterface[],
  streak: StreakInterface,
  database: any, //proper type to be set
  setWasDatabaseUpdated: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const todaysDate = new Date();

  if (streak.lastUpdateDate === formatDate(todaysDate)) {
    console.log(1);
    return;
  }

  if (
    streak.lastUpdateDate === formatDate(addDays(todaysDate, -1)) &&
    cards.map((obj) => obj.lastPracticeDate).includes(formatDate(todaysDate))
  ) {
    console.log(2);

    dbUpdateStreak(database, streak.value + 1, formatDate(todaysDate));
    setWasDatabaseUpdated(true);
    return;
  }

  if (
    cards.map((obj) => obj.lastPracticeDate).includes(formatDate(todaysDate))
  ) {
    console.log(3);

    dbUpdateStreak(database, 1, formatDate(todaysDate));
    setWasDatabaseUpdated(true);

    return;
  }
};
