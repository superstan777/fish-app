import { dbUpdateCard } from "./databaseFunctions/dbUpdateCard";
import { formatDate } from "./formatDate";
import { updateNextPracticeDate } from "./updateNextPracticeDate";
import { updateLevel } from "./updateLevel";

export const updateCard = async (
  database,
  cardData,
  setWasDatabaseUpdated,
  param
) => {
  let newLevel;
  if (param === "inc") {
    newLevel = updateLevel(cardData.level, "inc");
  } else if (param === "dec") {
    newLevel = updateLevel(cardData.level, "dec");
  }

  const newNextPracticeDate = updateNextPracticeDate(newLevel);
  const updatedCard = {
    ...cardData,
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
