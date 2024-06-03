const removeUnwantedChars = (response) => {
  return response.replace(/[.\n]/g, "");
};

module.exports = removeUnwantedChars;
