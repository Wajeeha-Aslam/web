const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require('../../models/product');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
filename: (req, file, cb) => {
  cb(null, `${Date.now()}-${file.originalname}`);
}

});
const upload = multer({ storage });

// ✅ This is the route you're missing
router.post("/products/upload-image/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    const imagePath = "/assets/" + req.file.filename; // Accessible via public/

    await Product.findByIdAndUpdate(productId, { image: imagePath });

    res.redirect("/admin/products");
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).send("Upload failed.");
  }
});

module.exports = router;
