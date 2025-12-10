import React from "react";

function Toast({ message, type }) {
  const color =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";

  return (
    <div className={`fixed top-6 right-6 px-4 py-3 text-white rounded-lg shadow-lg ${color}`}>
      {message}
    </div>
  );
}

export default Toast;
