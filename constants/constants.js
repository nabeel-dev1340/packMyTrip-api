require("dotenv").config();

const MODEL = "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY;
const PURPOSE = ["business", "leisure", "adventure", "filming"];
const CLOTHING_STYLES = ["formal", "casual", "sporty", "mix"];
const PACKING_STYLES = ["light", "heavy", "minimalist", "normal"];
const GENDER = ["male", "female","other"];
const JSON_SCHEMA = {
  essentials: [],
  Clothing: [],
  Toiletries: [],
  Electronics: [],
  Miscellaneous: [],
};

module.exports = {
  MODEL,
  API_KEY,
  PURPOSE,
  CLOTHING_STYLES,
  PACKING_STYLES,
  GENDER,
  JSON_SCHEMA,
};
