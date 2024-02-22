export const dbUpdateStreak = (
  database,
  streakNumber,
  formatedLastUpdateDate
) => {
  database.transaction((tx) => {
    tx.executeSql(
      "UPDATE streak SET number = ?, lastUpdateDate = ? WHERE id = 1 ",
      [streakNumber, formatedLastUpdateDate],
      (_, resultSet) => {
        console.log(resultSet);
        console.log(
          `New streak object: {number: ${streakNumber}, lastUpdateDate: ${formatedLastUpdateDate}}`
        );
      },
      (_, error) => {
        console.error("Error updating streak table:", error);
      }
    );
  });
};
