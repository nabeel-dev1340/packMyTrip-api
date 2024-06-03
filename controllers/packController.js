const { MODEL, API_KEY, JSON_SCHEMA } = require("../constants/constants");
const removeUnwantedChars = require("../helpers/removeUnwanted");
const { packPrefsSchema } = require("../schemas/packingPrefs");
const axios = require("axios");

const packController = async (req, res) => {
  try {
    const { error, value } = packPrefsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const Prompt = `
      As an experienced and expert travel packing assistant, generate a packing list based on the following criteria:

      - **Destination**: ${value.destination}
      - **Number of Days**: ${value.days}
      - **Gender**: ${value.gender}
      - **Purpose of Travel**: ${value.purpose}
      - **Preferred Clothing Style**: ${value.clothing_style}
      - **Packing Style**: ${value.packing_style}
      - **Outdoor Activities Planned**: ${value.outdoor_activities}
      - **Indoor Activities Planned**: ${value.indoor_activities}

      Ensure that the packing list is comprehensive and tailored to meet the specific needs and preferences outlined above. Include all essential items such as clothing, toiletries, electronics, and any other items relevant to the activities planned.
      Provide the response in a RFC8259 compliant JSON format following this schema without deviation: ${JSON.stringify(
        JSON_SCHEMA
      )}
      `;

    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    };

    const data = {
      model: MODEL,
      response_format: {
        type: "json_object",
      },
      messages: [{ role: "user", content: Prompt }],
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers }
    );

    const cleanedRes = removeUnwantedChars(
      response.data.choices[0].message.content
    );

    return res.status(200).json({ response: JSON.parse(cleanedRes) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  packController,
};
