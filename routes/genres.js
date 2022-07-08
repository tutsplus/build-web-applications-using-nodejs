// routes/genres.js

import { Router } from "express";
import mongoose from "mongoose";
import genre from "../models/genre";

router.get("/", (req, res, next) => {
  const genres = Genre.find({})
    .exec()
    .then(
      (genres) => {
        res.render("genres", { genres: genres });
      },
      (err) => {
        throw err;
      }
    );
});

// 1
router.get("/add", (req, res, next) => {
  res.render("addGenre");
});

// 2
router.post("/add", (req, res, next) => {
  req.checkBody("name", "Name is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render("addgenres", { genre, errors });
  }

  const genre = new Genre(req.body)
    .save()
    .then((data) => {
      res.redirect("/genres");
    })
    .catch((errors) => {
      console.log("oops...");
      console.log(errors);
    });
});

// 3
export default router;
