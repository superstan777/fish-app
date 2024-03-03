export interface CardInterface {
  id: number;
  polish: string;
  english: string;
  level: number;
  creationDate: string;
  lastPracticeDate: string;
  nextPracticeDate: string;
}

export interface StreakInterface {
  id: number;
  value: number;
  lastUpdateDate: string;
}
