import express from "express";
import { join } from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import expressValidator from "express-validator";
import flash from "connect-flash";
import mongoose from "mongoose";
import messages from "express-messages";
// 1
import genres from "./routes/genres";
import books from "./routes/books";

const app = express();

// 2
const mongoDB =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/tutsplus-library";
mongoose.connect(mongoDB);

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// 3
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// 4
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

// 5
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages;
  next();
});

// 6
app.use("/genres", genres);
app.use("/books", books);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
