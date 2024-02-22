import { formatDate } from "./formatDate";
import { dbUpdateStreak } from "./databaseFunctions/dbUpdateStreak";
import { addDays } from "./addDays";

export const updateStreak = (cards, streak, db) => {
  const todaysDate = new Date();

  if (streak.lastUpdateDate === formatDate(todaysDate)) {
    return;
  }

  if (
    streak.lastUpdateDate === formatDate(addDays(todaysDate, -1)) &&
    cards.map((obj) => obj.lastPracticeDate).includes(formatDate(todaysDate))
  ) {
    dbUpdateStreak(db, streak.number + 1, formatDate(todaysDate));
    return;
  }

  if (
    cards.map((obj) => obj.lastPracticeDate).includes(formatDate(todaysDate))
  ) {
    dbUpdateStreak(db, 1, formatDate(todaysDate));
    return;
  }
};
