// OK
// updates data base and console logs new streak object
export const dbUpdateStreak = (
  database,
  streakNumber,
  formatedLastUpdateDate
) => {
  database.transaction((tx) => {
    tx.executeSql(
      "UPDATE streak SET number = ?, lastUpdateDate = ? WHERE id = 1 ",
      [streakNumber, formatedLastUpdateDate],
      (_, __) => {
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
