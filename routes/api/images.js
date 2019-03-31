const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require("method-override");
const Grid = require("gridfs-stream");

const db = require("../../config/keys").mongoURI;

// Create mongo connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads"
    };
  }
});
const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({ success: true });
});

// @route GET api/images/:filename
// @desc Display Image
router.get("/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    console.log(file);
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});
module.exports = router;
