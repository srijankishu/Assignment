import React from "react";
import api from "../api";

function DocumentList({ documents, refreshDocuments }) {

  const handleDownload = async (id) => {
    const response = await api.get(`/documents/${id}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const doc = documents.find((d) => d.id === id);
    link.download = doc?.filename || "document.pdf";

    link.click();
  };

  const handleView = (doc) => {
    const url = `http://localhost:5000/uploads/${doc.filename}`;
    window.open(url, "_blank");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    await api.delete(`/documents/${id}`);
    refreshDocuments();
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Uploaded Documents
      </h3>

      {documents.length === 0 ? (
        <p className="text-gray-500 text-center">No documents found.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              {/* LEFT SIDE */}
              <div>
                <p className="font-medium text-gray-800">{doc.filename}</p>
                <p className="text-sm text-gray-500">
                  {Math.round(doc.filesize / 1024)} KB
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">

                <button
                  onClick={() => handleView(doc)}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View
                </button>

                <button
                  onClick={() => handleDownload(doc.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Download
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentList;
