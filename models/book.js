import mongoose from "mongoose";
// models/book.js

const Schema = mongoose.Schema;

const bookSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a book name",
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  genre: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
});

export default mongoose.model("Book", bookSchema);
