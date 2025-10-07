import React, { useState } from "react";

import { saveAs } from "file-saver";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";

const ApiDocs = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const exportCSV = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/admin/predictions");
      const predictions = res.data;

      if (!predictions || predictions.length === 0) {
        alert("No data available to export.");
        setLoading(false);
        return;
      }


      const filteredPredictions = predictions.map(
        ({ _id, email, createdAt, ...keep }) => keep
      );

      //Convert JSON to CSV
      const csvHeader = Object.keys(filteredPredictions[0]).join(",") + "\n";
      const csvRows = filteredPredictions
        .map((row) =>
          Object.values(row)
            .map((val) => `"${val}"`) //values in quotes
            .join(",")
        )
        .join("\n");

      const csvData = csvHeader + csvRows;

      //save file
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "predictions_export.csv");

      setLoading(false);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Error exporting CSV");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        API Documentation / Export Data
      </h1>
      <p className="mb-4 text-gray-600 text-center max-w-md">
        Admin can export all prediction data as CSV for research purposes.
      </p>
      {/* from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6] */}
      {/* hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a] */}
      <button
        onClick={exportCSV}
        className="bg-gradient-to-b from-[#4c669f] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 px-6 py-3 rounded-lg cursor-pointer shadow-md"
        disabled={loading}
      >
        {loading ? "Exporting..." : "Export Predictions CSV"}
      </button>
    </div>
  );
};

export default ApiDocs;
