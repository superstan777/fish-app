//console logs info
export const dbUpdateCard = (dataBase, cardDataObject) => {
  dataBase.transaction((tx) => {
    tx.executeSql(
      "UPDATE cards SET level = ?, lastPracticeDate = ?, nextPracticeDate = ? WHERE id = ?",
      [
        cardDataObject.level,
        cardDataObject.lastPracticeDate,
        cardDataObject.nextPracticeDate,
        cardDataObject.id,
      ],
      (txObj, resultSet) => {
        console.log(cardDataObject.id + "cardData id");
        console.log(`Record with id ${cardDataObject.id} updated successfully`);
      },
      (txObj, error) => {
        console.error(`dbInsertStreak error: ${error}`);
      }
    );
  });
};

// const cardDataObject = {
//     id,
//     level,
//     lastPracticeDate,
//     nextPracticeDate,
// }
