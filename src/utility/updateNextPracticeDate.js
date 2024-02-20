import { addDays } from "./addDays";
import { formatDate } from "./formatDate";

export const updateNextPracticeDate = (level) => {
  const nextPracticeDate = new Date();

  const daysToAdd = [1, 3, 7, 14, 30, 90, 180, -1];
  const newNextPracticeDate = addDays(nextPracticeDate, daysToAdd[level]);

  return formatDate(newNextPracticeDate);
};
