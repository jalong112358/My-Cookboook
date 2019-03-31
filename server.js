const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const recipes = require("./routes/api/recipes");
const images = require("./routes/api/images");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/recipes", recipes);
app.use("/api/images", images);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
