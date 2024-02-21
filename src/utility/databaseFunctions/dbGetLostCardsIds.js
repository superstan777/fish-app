import { formatDate } from "../formatDate";

export const dbGetLostCardsIds = (database) => {
  const todaysDate = formatDate(new Date());

  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cards WHERE nextPracticeDate < DATE('now')",
        [todaysDate],
        (_, resultSet) => {
          const result = resultSet.rows._array;
          const arrayOfIds = result.map((obj) => {
            return obj.id;
          });
          resolve(arrayOfIds);
        },
        (_, error) => {
          console.log(`dbGetLostCards error: ${error}`);
          reject(error);
        }
      );
    });
  });
};
