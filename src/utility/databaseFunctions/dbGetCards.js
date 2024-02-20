import { formatDate } from "../formatDate";

export const dbGetCards = async (dataBase) => {
  const todaysDate = formatDate(new Date());

  return new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
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
