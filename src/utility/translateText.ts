import axios from "axios";

export const translateText = async (
  textToTranslate: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}?key=${process.env.EXPO_PUBLIC_API_KEY}`,
      {
        q: textToTranslate,
        target: "en",
      }
    );
    const translatedText: string =
      response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return null;
  }
};
