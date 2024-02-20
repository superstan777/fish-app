// RETURN TO BE CHECKED

export const dbGetStreak = (dataBase) => {
  dataBase.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM streakData WHERE id=(?)",
      [1],
      (_, resultSet) => {
        console.log(resultSet.rows._array[0] + ": getStreak function");
        const result = resultSet.rows._array[0];
        return result;
      },
      (_, error) => console.log(error + ": getStreak error")
    );
  });
};

// RETURNING OBJECT OR UNDEFINED
