const express = require("express");
const packController = require("../controllers/packController");

const packRoutes = express.Router();

packRoutes.post("/generate", packController.packController);

module.exports = packRoutes;
