export const isStringEmpty = (string) => {
  if (string.trim().length === 0) {
    return true;
  }
  return false;
};

//   export const isWordEmpty = (string) => {
//     if (textInput.trim().length === 0) {
//       showAlert("empty");
//       setTextInput("");
//       return true;
//     }
//     return false;
//   };
// showAlert("empty");
// setTextInput("");
