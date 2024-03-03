import { addDays } from "./addDays";
import { formatDate } from "./formatDate";

export const updateNextPracticeDate = (level: number): string => {
  const nextPracticeDate: Date = new Date();

  const daysToAdd: number[] = [1, 3, 7, 14, 30, 90, 180, -1];
  const newNextPracticeDate: Date = addDays(nextPracticeDate, daysToAdd[level]);

  return formatDate(newNextPracticeDate);
};
