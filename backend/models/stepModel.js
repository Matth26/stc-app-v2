const mongoose = require('mongoose');
const { Schema } = mongoose;

const stepSchema = new Schema({
  date: Date,
  text: String,
});

module.exports = stepSchema;
