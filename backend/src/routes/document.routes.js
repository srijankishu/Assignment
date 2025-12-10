const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const controller = require("../controllers/document.controller");

router.post("/upload", upload.single("file"), controller.uploadDocument);
router.get("/", controller.getDocuments);
router.get("/:id", controller.downloadDocument);
router.delete("/:id", controller.deleteDocument);

module.exports = router;
