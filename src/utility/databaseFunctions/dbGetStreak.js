export const dbGetStreak = async (database) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM streak WHERE id=(?)",
        [1],
        (_, resultSet) => {
          const result = resultSet.rows._array[0];
          resolve(result);
        },
        (_, error) => {
          console.log(error + ": getStreak error");
          reject(error);
        }
      );
    });
  });
};
