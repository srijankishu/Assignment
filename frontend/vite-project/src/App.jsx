import { useEffect, useState } from "react";
import api from "./api";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import Toast from "./components/Toast";

function App() {
  const [documents, setDocuments] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const fetchDocuments = async () => {
    const res = await api.get("/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* HEADER */}
      <header className="bg-blue-600 text-white py-5 shadow-md">
        <h1 className="text-center text-3xl font-semibold tracking-wide">
          Medical Document Manager
        </h1>
        <p className="text-center text-sm opacity-90">
          Upload • Manage • Download • Delete medical PDFs
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex justify-center px-4">
        <div className="w-full max-w-3xl">
          
          {/* Upload Section */}
          <UploadForm refreshDocuments={fetchDocuments} showToast={showToast} />

          {/* Document List */}
          <DocumentList
            documents={documents}
            refreshDocuments={fetchDocuments}
            showToast={showToast}
          />
        </div>
      </main>

      {/* TOAST */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} />
      )}

      {/* FOOTER */}
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
        Patient Portal Project • Built with React & Node • 2025 by Srijan
      </footer>
    </div>
  );
}

export default App;
