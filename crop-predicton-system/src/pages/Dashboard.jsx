import React from "react";

export const Dashboard = () => {
  // Example dummy data
  const stats = [
    { title: "Total Fields", value: 12 },
    { title: "Predicted Crops", value: 34 },
    { title: "Expected Yield (tons)", value: 120 },
    { title: "Weather Alerts", value: 3 },
  ];

  const recentPredictions = [
    { field: "Field 1", crop: "Wheat", date: "2025-10-25" },
    { field: "Field 2", crop: "Corn", date: "2025-10-24" },
    { field: "Field 3", crop: "Rice", date: "2025-10-23" },
  ];

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
            >
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Predictions Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Predictions
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-500">Field</th>
                <th className="py-2 px-4 text-gray-500">Crop</th>
                <th className="py-2 px-4 text-gray-500">Prediction Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.field}</td>
                  <td className="py-2 px-4">{item.crop}</td>
                  <td className="py-2 px-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
