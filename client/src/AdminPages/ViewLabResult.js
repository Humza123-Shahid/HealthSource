import React from "react";
import { useLocation } from "react-router-dom";

const ViewLabResult = () => {
  const location = useLocation();
  const LabResult = location.state?.labresult || {};
  const labrequestName = location.state?.labrequest || {};
  const labtestName = location.state?.labtest || {};
  const index = location.state?.idx;
  const formattedResultDate = new Date(LabResult.resultDate).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  );
  const parts = LabResult.filePath.split("\\");

  const remainingParts = parts.slice(1);

  const newPath = remainingParts.join("/");

  const fileName = parts.at(-1);
  const fileUrl = `http://localhost:5000/${newPath}`;
  console.log(fileName);
  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Optional
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();

      // 2. Create a temporary URL for the blob
      const urlBlob = window.URL.createObjectURL(blob);

      // 3. Create a hidden anchor element
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", fileName || "document.pdf");

      // 4. Append to the body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      link.remove();

      // 5. Clean up the memory
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div>
      <h1 className="ms-4">Lab Result Data</h1>
      <table className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Lab Request</th>
            <th>Test</th>
            <th>Result Value</th>
            <th>Units</th>
            <th>Remarks</th>
            <th>File Path</th>
            <th>Result Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{index}</td>
            <td>{labrequestName}</td>
            <td>{labtestName}</td>
            <td>{LabResult.resultValue}</td>
            <td>{LabResult.units}</td>
            <td>{LabResult.remarks}</td>
            <td>{LabResult.filePath}</td>
            <td>{formattedResultDate}</td>
          </tr>
        </tbody>
      </table>
      {/* <a href={fileUrl} download="Proposed_FileName.png">
      Download PDF
    </a> */}
      <button className="ms-4 btn btn-primary mt-4" onClick={handleDownload}>
        Download Test Result
      </button>
    </div>
  );
};

export default ViewLabResult;
