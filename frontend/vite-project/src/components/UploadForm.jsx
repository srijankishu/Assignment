import { useState } from "react";
import api from "../api";

function UploadForm({ refreshDocuments, showToast }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      showToast("Please select a PDF file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Uploaded successfully!", "success");
      setFile(null);
      refreshDocuments();
    } catch (err) {
      showToast("Upload failed!", "error");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Upload Medical Document
      </h2>

      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="text-gray-500">
          {file ? file.name : "Click to select a PDF file"}
        </span>
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadForm;
