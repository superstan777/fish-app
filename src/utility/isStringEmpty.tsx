export const isStringEmpty = (string: string): boolean => {
  if (string.trim().length === 0) {
    return true;
  }
  return false;
};
