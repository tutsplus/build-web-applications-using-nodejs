import mongoose from "mongoose";
// models/genre.js

const Schema = mongoose.Schema;

const genreSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a Genre name",
  },
});
export default mongoose.model("Genre", genreSchema);
