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
        console.log(`Streak has been updated properly`);
      },
      (_, error) => {
        console.error("Error updating streak table:", error);
      }
    );
  });
};
