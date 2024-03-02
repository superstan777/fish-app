export const updateLevel = (level: number, action: "inc" | "dec"): number => {
  let newLevel: number;
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