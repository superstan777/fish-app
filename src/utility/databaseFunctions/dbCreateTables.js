// OK
// creates 2 tables - cards and streak - if not exist
export const dbCreateTables = (dataBase) => {
  dataBase.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, polish TEXT, english TEXT, level INTEGER, creationDate DATE, lastPracticeDate DATE, nextPracticeDate DATE)"
    );
  });
  dataBase.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS streak (id INTEGER, number INTEGER, lastUpdateDate DATE)"
    );
  });
};
