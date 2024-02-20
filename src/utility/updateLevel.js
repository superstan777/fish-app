export const updateLevel = (level, action) => {
  let newLevel;
  if (action === "inc") {
    newLevel = level + 1;
  }
  if (action === "dec" && level < 2) {
    newLevel = 0;
  }
  if (action === "dec" && level >= 2) {
    newLevel = level - 2;
  }
  return newLevel;
};
