import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TransformerChart = ({ data }) => {
  // Format data for chart: latest first
  const chartData = data
    .map((entry) => ({
      time: entry.timestamp.toDate().toLocaleString(),
      temperature: Number(entry.temperature),
      oilLevel: Number(entry.oilLevel),
      load: Number(entry.load),
    }))
    .reverse(); // Show older on left, recent on right

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#ff4d4f" name="Temperature (°C)" />
          <Line type="monotone" dataKey="oilLevel" stroke="#1890ff" name="Oil Level (%)" />
          <Line type="monotone" dataKey="load" stroke="#52c41a" name="Load (kW)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransformerChart;
