export const formatDate = (dateObj) => {
  "worklet";
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${year}-${month}-${day}`;
};
