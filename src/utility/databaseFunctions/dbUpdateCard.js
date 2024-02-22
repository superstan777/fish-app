export const dbUpdateCard = (database, card) => {
  database.transaction((tx) => {
    tx.executeSql(
      "UPDATE cards SET level = ?, lastPracticeDate = ?, nextPracticeDate = ? WHERE id = ?",
      [card.level, card.lastPracticeDate, card.nextPracticeDate, card.id],
      (_, __) => {
        console.log(`Card with id ${card.id} updated successfully`);
      },
      (_, error) => {
        console.error(`dbInsertStreak error: ${error}`);
      }
    );
  });
};
