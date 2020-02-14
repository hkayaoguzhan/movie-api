const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, "`{PATH}` alanı zorunludur."],
    maxlength: 50,
    minlength: 1
  },
  category: {
    type: String,
    maxlength: 30,
    minlength: 2
  },
  country: String,
  year: Number,
  imdb_score: {
    type: Number,
    max: 10,
    min: 0
  },
  director_id: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("movie", MovieSchema);
