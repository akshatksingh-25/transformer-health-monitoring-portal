import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { sendAlertEmail } from "../utils/sendAlertEmail";


const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const DataEntry = () => {
  const [formData, setFormData] = useState({
    transformerId: "",
    temperature: "",
    oilLevel: "",
    load: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = {
      ...formData,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "transformerData"), data);

    // Alert condition
    if (Number(data.temperature) > 90 || Number(data.oilLevel) < 40) {
      await sendAlertEmail(data);
    }

    alert("✅ Data added successfully!");
    setFormData({ transformerId: "", temperature: "", oilLevel: "", load: "" });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "linear-gradient(to right,rgb(9, 79, 116),rgb(14, 72, 92),rgb(40, 84, 103))",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          paddingTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            background: "#f0f4f8",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(6, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#0055aa", textAlign: "center" }}>
            Enter Transformer Health Data
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              name="transformerId"
              placeholder="Transformer ID"
              value={formData.transformerId}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="temperature"
              placeholder="Temperature (°C)"
              value={formData.temperature}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="oilLevel"
              placeholder="Oil Level (%)"
              value={formData.oilLevel}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="load"
              placeholder="Load (kW)"
              value={formData.load}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#0055aa",
                color: "white",
                padding: "12px",
                fontSize: "16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DataEntry;
