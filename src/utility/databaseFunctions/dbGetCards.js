import { formatDate } from "../formatDate";

export const dbGetCards = async (database) => {
  const todaysDate = formatDate(new Date());

  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cards WHERE nextPracticeDate=(?) OR lastPracticeDate=(?)",
        [todaysDate, todaysDate],
        (_, resultSet) => {
          const result = resultSet.rows._array;
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          console.log(`dbGetCards error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
