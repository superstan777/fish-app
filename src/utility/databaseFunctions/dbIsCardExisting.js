export const dbIsCardExisting = async (dataBase, string) => {
  return new Promise((resolve, reject) => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM cards WHERE polish=(?)`,
        [string.trim()],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (txObj, error) => {
          console.log(error + " dbIsExisting error");
          reject(error);
        }
      );
    });
  });
};
