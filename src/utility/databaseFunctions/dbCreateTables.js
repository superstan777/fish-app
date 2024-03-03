export const dbCreateTables = (database) => {
  database.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, polish TEXT, english TEXT, level INTEGER, creationDate DATE, lastPracticeDate DATE, nextPracticeDate DATE)"
    );
  });
  database.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS streak (id INTEGER, value INTEGER, lastUpdateDate DATE)"
    );
  });
};
