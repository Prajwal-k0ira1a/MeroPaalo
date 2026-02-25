import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { peakHoursData } from "../../data/adminMockData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function PeakHoursChart() {
  const labels = peakHoursData.map((d) => d.hour);
  const values = peakHoursData.map((d) => d.value);
  const colors = peakHoursData.map((d) => (d.active ? "#0d9488" : "#e5e7eb"));

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
        callbacks: { label: (ctx) => `${ctx.raw} customers` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: (ctx) =>
            peakHoursData[ctx.index]?.active ? "#0d9488" : "#9ca3af",
          font: { size: 11, weight: "500" },
        },
        border: { display: false },
      },
      y: { display: false },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mt-16 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Peak Hours</h2>
        <span className="text-xs text-gray-400 font-medium">Today</span>
      </div>

      <div className="flex-1 min-h-0">
        <Bar data={data} options={options} />
      </div>

      <div className="flex justify-between pt-3 mt-3 border-t border-gray-100">
        <div>
          <p className="text-[11px] text-gray-400">Peak Time</p>
          <p className="text-sm font-bold text-gray-900">11:00 - 12:00</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400">Forecast</p>
          <p className="text-sm font-bold text-gray-900">High Traffic</p>
        </div>
      </div>
    </div>
  );
}
