import axios from "axios";

export const translateText = async (text) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}?key=${process.env.API_KEY}`,
      {
        q: text,
        target: "en",
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return null;
  }
};
