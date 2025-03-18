import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useMediaQuery from "@/hooks/use-media-query";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 80 },
  { name: "May", value: 50 },
];

const PerformanceChart: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Performance Chart</h2>
      <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;