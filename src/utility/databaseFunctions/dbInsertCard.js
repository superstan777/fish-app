export const dbInserCard = (dataBase, cardObject) => {
  dataBase.transaction((tx) => {
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
      (txObj, resultSet) => {
        console.log(`${cardObject.polish} word has been added`);
      },
      (txObj, error) => console.log(`dbInsertCard error: ${error}`)
    );
  });
};
