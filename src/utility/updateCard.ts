import { dbUpdateCard } from "./databaseFunctions/dbUpdateCard";
import { formatDate } from "./formatDate";
import { updateNextPracticeDate } from "./updateNextPracticeDate";
import { updateLevel } from "./updateLevel";
import { CardInterface } from "../Interfaces";

export const updateCard = async (
  database: any, // proper type to be set
  card: CardInterface,
  setWasDatabaseUpdated: React.Dispatch<React.SetStateAction<boolean>>,
  param: "increase" | "decrease"
): Promise<void> => {
  let newLevel: number;
  if (param === "increase") {
    newLevel = updateLevel(card.level, "increase");
  } else if (param === "decrease") {
    newLevel = updateLevel(card.level, "decrease");
  }

  const newNextPracticeDate = updateNextPracticeDate(newLevel);
  const updatedCard = {
    ...card,
    level: newLevel,
    nextPracticeDate: newNextPracticeDate,
    lastPracticeDate: formatDate(new Date()),
  };
  try {
    dbUpdateCard(database, updatedCard);
    setWasDatabaseUpdated(true);
  } catch (error) {
    console.log(error);
  }
};
