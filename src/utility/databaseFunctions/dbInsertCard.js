export const dbInserCard = (database, cardObject) => {
  database.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO cards (polish, english, level, creationDate, lastPracticeDate, nextPracticeDate) values (?,?,?,?,?,?)",
      [
        cardObject.polish,
        cardObject.english,
        cardObject.level,
        cardObject.creationDate,
        cardObject.lastPracticeDate,
        cardObject.nextPracticeDate,
      ],
      (_, _) => {
        console.log(`${cardObject.polish} word has been added to database`);
      },
      (_, _) => console.log(`dbInsertCard error: ${error}`)
    );
  });
};
