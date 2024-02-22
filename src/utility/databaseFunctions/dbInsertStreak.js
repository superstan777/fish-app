import { formatDate } from "../formatDate";
import { addDays } from "../addDays";

export const dbInsertStreak = (database) => {
  database.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO streak (id, number, lastUpdateDate) values (?,?,?)",
      [1, 0, formatDate(addDays(new Date(), -1))],
      (_, __) => {
        console.log(`dbInsertStreak: new streak object has been inserted`);
      },
      (_, error) => console.log(`dbInsertStreak error: ${error}`)
    );
  });
};
