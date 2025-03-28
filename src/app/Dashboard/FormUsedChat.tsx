import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const FormUsedChart = () => {
  const [data, setData] = useState<{ formName: string; count: number }[]>([]);
  const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("day");

  useEffect(() => {
    fetchData(groupBy);
  }, [groupBy]);

  const fetchData = async (groupBy: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}form-usage?groupBy=${groupBy}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Soft pastel colors for bars
  const colors = [
    "rgba(255, 159, 64, 0.6)",   // Orange
    "rgba(153, 102, 255, 0.6)",  // Purple
    "rgba(46, 204, 113, 0.6)",   // Green
    "rgba(75, 192, 192, 0.6)",   // Teal
    "rgba(255, 99, 255, 0.6)",   // Magenta
    "rgba(54, 162, 235, 0.6)",   // Cyan
    "rgba(255, 206, 86, 0.6)",   // Amber
    "rgba(181, 101, 167, 0.6)",  // Mauve
    "rgba(255, 140, 105, 0.6)",  // Light Coral
  ];
  
  const chartData = {
    labels: data.map((item) => item.formName),
    datasets: [
      {
        label: "Number of Times Used",
        data: data.map((item) => item.count),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: data.map((_, index) => colors[index % colors.length].replace("0.6", "1")), // Stronger border
        borderWidth: 0,
        borderRadius: 20, // Rounded bars
      },
    ],
  };
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Hide horizontal grid lines
        },
      },
    },
  };
  

  return (
    <div className="col-12 col-lg-12 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between gap-3 mb-2">
            <h4 className="card-title text-primary mb-0">Form Usage Statistics</h4>
            <select
              className="form-select w-auto"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as "day" | "month" | "year")}
            >
              <option value="day">Daily</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <div style={{ height: "280px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUsedChart;
