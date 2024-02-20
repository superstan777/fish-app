// OK
// updates data base and console logs new streak object
export const dbUpdateStreak = (
  dataBase,
  streakNumber,
  formatedLastUpdateDate
) => {
  dataBase.transaction((tx) => {
    tx.executeSql(
      "UPDATE streak SET number = ?, lastUpdateDate = ? WHERE id = 1 ",
      [streakNumber, formatedLastUpdateDate],
      () => {
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
