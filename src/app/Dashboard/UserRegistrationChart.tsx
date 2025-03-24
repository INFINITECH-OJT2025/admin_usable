import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const UserRegistrationChart = () => {
  const [data, setData] = useState<{ period: string; count: number }[]>([]);
  const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("day");

  useEffect(() => {
    fetchData(groupBy);
  }, [groupBy]);

  const fetchData = async (groupBy: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user-registrations?groupBy=${groupBy}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const chartData = {
    labels: data.map((item) => item.period),
    datasets: [
      {
        label: "Number of Registered Users",
        data: data.map((item) => item.count),
        borderColor: "rgb(0, 81, 255)",
        backgroundColor: "rgba(93, 255, 255, 0.2)",
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Adjust for smooth waves (higher values make it wavier)
        pointRadius: 1.5, // Reduce points visibility
        pointHoverRadius: 6, // Slightly larger hover effect
        cubicInterpolationMode: "monotone", // Smooth interpolation
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines for a cleaner look
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Lighter grid for better visuals
        },
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round", // Makes corners smoother
        shadowOffsetX: 5, // X-axis offset of the shadow
        shadowOffsetY: 5, // Y-axis offset of the shadow
        shadowBlur: 15, // Blur radius of the shadow
        shadowColor: "rgba(0, 81, 255, 0.5)", // Shadow color (same as border color with opacity)
      },
    },
  };

  return (
    <div className="col-12 col-lg-12 order-2 order-md-3 order-lg-2 mb-4">
      <div className="card">
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              {/* Flex container to align title and dropdown side by side */}
              <div className="d-flex justify-content-between gap-3 mb-2">
                <h4 className="card-title text-primary mb-0">User Registration Statistics</h4>
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
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationChart;
