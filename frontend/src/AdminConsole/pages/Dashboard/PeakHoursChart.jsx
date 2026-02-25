import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function PeakHoursChart({ dataPoints }) {
  const labels = dataPoints.map((point) => point.hour);
  const values = dataPoints.map((point) => point.value);
  const colors = dataPoints.map((point) => (point.active ? "#0d9488" : "#e5e7eb"));

  const peak = dataPoints.reduce(
    (acc, point) => (point.value > acc.value ? point : acc),
    { hour: "--", value: 0, active: false }
  );

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.raw} tokens` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (ctx) => (dataPoints[ctx.index]?.active ? "#0d9488" : "#9ca3af"),
          font: { size: 11, weight: "500" },
        },
        border: { display: false },
      },
      y: { display: false },
    },
  };

  return (
    <div className="mt-16 flex min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Peak Hours</h2>
        <span className="text-xs font-medium text-gray-400">Today</span>
      </div>

      <div className="min-h-0 flex-1">
        <Bar data={data} options={options} />
      </div>

      <div className="mt-3 flex justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-[11px] text-gray-400">Peak Time</p>
          <p className="text-sm font-bold text-gray-900">{peak.hour}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400">Traffic</p>
          <p className="text-sm font-bold text-gray-900">
            {peak.value > 15 ? "High" : peak.value > 5 ? "Medium" : "Low"}
          </p>
        </div>
      </div>
    </div>
  );
}
