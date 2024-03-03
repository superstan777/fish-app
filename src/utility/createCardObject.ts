import { formatDate } from "./formatDate";
import { translateText } from "./translateText";

export interface CardObjectInterface {
  // CardInterface to be used
  polish: string;
  english: string | null;
  level: number;
  creationDateString: string;
  lastPracticeDateString: string | null;
  nextPracticeDateString: string;
}

export const createCardObject = async (
  input: string
): Promise<CardObjectInterface> => {
  const defaultDate: string = formatDate(new Date());
  const defaultLevel: number = 0;
  const trimmedInput: string = input.trim();
  const translatedText: string | null = await translateText(trimmedInput);

  const cardObject: CardObjectInterface = {
    polish: trimmedInput,
    english: translatedText,
    level: defaultLevel,
    creationDateString: defaultDate,
    lastPracticeDateString: null,
    nextPracticeDateString: defaultDate,
  };

  return cardObject; // could return english = null, to be handled
};
