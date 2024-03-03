export const updateLevel = (
  level: number,
  action: "increase" | "decrease"
): number => {
  let newLevel: number;
  if (action === "increase") {
    newLevel = level + 1;
  }
  if (action === "decrease" && level < 2) {
    newLevel = 0;
  }
  if (action === "decrease" && level >= 2) {
    newLevel = level - 2;
  }
  return newLevel;
};
