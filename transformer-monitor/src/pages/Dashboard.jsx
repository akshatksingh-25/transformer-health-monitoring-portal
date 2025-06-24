import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import TransformerCard from "../components/TransformerCard";

const Dashboard = () => {
  const [value, loading, error] = useCollection(collection(db, "transformerData"));
  const [searchQuery, setSearchQuery] = useState("");

  // Group data by transformerId
  const groupedData = {};
  value?.docs.forEach((doc) => {
    const data = doc.data();
    const id = data.transformerId;
    if (!groupedData[id]) groupedData[id] = [];
    groupedData[id].push({ id: doc.id, ...data });
  });

  // Filter transformer IDs based on search
  const filteredTransformerIds = Object.keys(groupedData).filter((id) =>
    id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "linear-gradient(to right,rgb(9, 79, 116),rgb(14, 72, 92),rgb(40, 84, 103))",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f7fa",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "95%",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#0055aa",
              fontWeight: "bold",
            }}
          >
            Live Transformer Health Dashboard
          </h2>

          {/* 🔍 Search Box */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Search by Transformer ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 15px",
                width: "300px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          {/* 📦 Loading & Error */}
          {loading && <p style={{ textAlign: "center" }}>Loading data...</p>}
          {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>}

          {/* 📊 Render Cards */}
          {filteredTransformerIds.map((transformerId) => (
            <TransformerCard
              key={transformerId}
              transformerId={transformerId}
              data={groupedData[transformerId]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
