const Joi = require("joi");
const {
  PURPOSE,
  CLOTHING_STYLES,
  PACKING_STYLES,
  GENDER,
} = require("../constants/constants");

const packPrefsSchema = Joi.object({
  destination: Joi.string().required(),
  days: Joi.number().integer().min(1).max(30),
  gender: Joi.string()
    .valid(...GENDER)
    .insensitive()
    .required(),
  purpose: Joi.string()
    .valid(...PURPOSE)
    .insensitive()
    .required(),
  clothing_style: Joi.string()
    .valid(...CLOTHING_STYLES)
    .insensitive()
    .required(),
  packing_style: Joi.string()
    .valid(...PACKING_STYLES)
    .insensitive()
    .required(),
  outdoor_activities: Joi.string().allow(""),
  indoor_activities: Joi.string().allow(""),
});

module.exports = { packPrefsSchema };
