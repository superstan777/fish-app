export const dbInsertCard = (database, cardObject) => {
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
      (_, __) => {
        console.log(`${cardObject.polish} word has been added to database`);
      },
      (_, __) => console.log(`dbInsertCard error: ${error}`)
    );
  });
};
