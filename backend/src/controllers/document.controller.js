const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");

// Upload a PDF
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "PDF is required" });

    const doc = await Document.create({
      filename: req.file.filename,
      filepath: req.file.path,
      filesize: req.file.size,
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// List all documents
exports.getDocuments = async (req, res) => {
  const docs = await Document.findAll({ order: [["id", "DESC"]] });
  res.json(docs);
};

// Download file
exports.downloadDocument = async (req, res) => {
  const doc = await Document.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ message: "File not found" });

  res.download(doc.filepath, doc.filename);
};

// Delete file
exports.deleteDocument = async (req, res) => {
  const doc = await Document.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ message: "File not found" });

  // Delete physical file
  fs.unlinkSync(doc.filepath);

  // Delete DB row
  await doc.destroy();

  res.json({ message: "Document deleted successfully" });
};
