import { formatDate } from "./formatDate";
import { dbUpdateStreak } from "./databaseFunctions/dbUpdateStreak";
import { addDays } from "./addDays";

export const updateStreak = (
  cards,
  streakObject,
  database,
  setWasDatabaseUpdated
) => {
  const todaysDate = new Date();

  if (streakObject.lastUpdateDate === formatDate(todaysDate)) {
    console.log(1);
    return;
  }

  if (
    streakObject.lastUpdateDate === formatDate(addDays(todaysDate, -1)) &&
    cards.map((obj) => obj.lastPracticeDate).includes(formatDate(todaysDate))
  ) {
    console.log(2);

    dbUpdateStreak(database, streakObject.number + 1, formatDate(todaysDate));
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
