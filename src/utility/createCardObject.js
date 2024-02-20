import { formatDate } from "./formatDate";
import { translateText } from "./translateText";

export const createCardObject = async (string) => {
  const defaultDate = formatDate(new Date());
  const defaultLevel = 0;
  const trimedInput = string.trim();
  const translatedText = await translateText(trimedInput);

  const cardObject = {
    polish: trimedInput,
    english: translatedText,
    level: defaultLevel,
    creationDate: defaultDate,
    lastPracticeDate: null,
    nextPracticeDate: defaultDate,
  };

  return cardObject;
};
