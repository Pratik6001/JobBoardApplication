import React from "react";
import { Eye, Users2, BarChart3 } from "lucide-react";

export default function Card({ total, totalApplications }) {
  const avgApplications =
    total > 0 ? (totalApplications / total).toFixed(2) * 100 : "0.00";

  const cards = [
    {
      title: "Total Jobs",
      value: total,
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Applications",
      value: totalApplications,
      icon: <Users2 className="w-5 h-5 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Avg Applications / Job",
      value: avgApplications + "%",
      icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-gray-700">{card.title}</h1>
            <div className={`p-2 rounded-full ${card.bg}`}>{card.icon}</div>
          </div>
          <p className="font-bold text-3xl mt-4">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
