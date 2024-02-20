export const dbIsCardExisting = async (database, string) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM cards WHERE polish=(?)`,
        [string.trim()],
        (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (_, error) => {
          console.log(error + " dbIsExisting error");
          reject(error);
        }
      );
    });
  });
};
