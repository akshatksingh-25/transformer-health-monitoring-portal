import React, { useState } from "react";
import TransformerChart from "./TransformerChart";

const TransformerCard = ({ transformerId, data }) => {
  const [showPastData, setShowPastData] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  // Sort data by latest timestamp
  const sortedData = [...data].sort(
    (a, b) => b.timestamp.toDate() - a.timestamp.toDate()
  );
  const latest = sortedData[0];

  const getStatusColor = (temp) => {
    if (temp > 90) return "🔴";
    if (temp > 70) return "🟠";
    return "🟢";
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        marginBottom: "30px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "10px", color: "#003366" }}>
          Transformer ID: {transformerId}
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f6fc" }}>
              <th style={thStyle}>Temperature</th>
              <th style={thStyle}>Oil Level</th>
              <th style={thStyle}>Load</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{latest.temperature}°C</td>
              <td style={tdStyle}>{latest.oilLevel}%</td>
              <td style={tdStyle}>{latest.load}kW</td>
              <td style={tdStyle}>{getStatusColor(latest.temperature)}</td>
              <td style={tdStyle}>
                {latest.timestamp.toDate().toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <button style={btnStyle} onClick={() => setShowPastData(!showPastData)}>
            {showPastData ? "Hide Data" : "View Past Data"}
          </button>
          <button style={{ ...btnStyle, marginLeft: "10px" }} onClick={() => setShowGraph(!showGraph)}>
            {showGraph ? "Hide Graph" : "View Graph"}
          </button>
        </div>
      </div>

      {showPastData && (
        <div style={{ padding: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={thStyle}>Temperature</th>
                <th style={thStyle}>Oil Level</th>
                <th style={thStyle}>Load</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice(1).map((entry, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>{entry.temperature}°C</td>
                  <td style={tdStyle}>{entry.oilLevel}%</td>
                  <td style={tdStyle}>{entry.load}kW</td>
                  <td style={tdStyle}>{getStatusColor(entry.temperature)}</td>
                  <td style={tdStyle}>
                    {entry.timestamp.toDate().toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showGraph && (
        <div style={{ padding: "20px" }}>
          <TransformerChart data={sortedData} />
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const btnStyle = {
  backgroundColor: "#0055aa",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

export default TransformerCard;
