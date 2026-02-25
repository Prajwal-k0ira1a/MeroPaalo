import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { historyBars, historyLabels } from "../../data/mockData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: historyLabels,
  datasets: [
    {
      label: "Patients Served",
      data: historyBars,
      backgroundColor: "rgba(16, 185, 129, 0.7)",   // emerald-500
      borderColor: "rgba(16, 185, 129, 1)",
      borderWidth: 1.5,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.y} patients`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#9ca3af", font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(229,231,235,0.4)" },
      ticks: { color: "#9ca3af", font: { size: 11 }, stepSize: 20 },
    },
  },
};

export default function HistoryChart() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-base text-gray-900">
          Patients Served (Today)
        </span>
        <span className="text-xs text-gray-400">Updates every hour</span>
      </div>
      <div style={{ height: "180px" }} className="sm:h-[220px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
