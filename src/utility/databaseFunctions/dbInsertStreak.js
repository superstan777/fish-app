// Console logs inserted streak
//TO BE CHECKED
import { formatDate } from "../formatDate";
import { addDays } from "../addDays";

export const dbInsertStreak = (dataBase) => {
  dataBase.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO streak (id, number, lastUpdateDate) values (?,?,?)",
      [1, 0, formatDate(addDays(todaysDate, -1))],
      (_, resultSet) => {
        const result = {
          id: resultSet.insertId,
          number: resultSet.insertNumber,
          lastUpdateDate: resultSet.insertLastUpdateDate,
        };
        console.log(
          `dbInsertStreak: new streak object has been inserted: ${result} `
        );
      },
      (_, error) => console.log(`dbInsertStreak error: ${error}`)
    );
  });
};
