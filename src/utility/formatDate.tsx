export const formatDate = (date: Date): string => {
  let day: number = date.getDate();
  let month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const paddedDay: string = day < 10 ? `0${day}` : `${day}`;
  const paddedMonth: string = month < 10 ? `0${month}` : `${month}`;

  return `${year}-${paddedMonth}-${paddedDay}`;
};
