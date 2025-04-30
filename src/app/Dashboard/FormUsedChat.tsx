import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const FormUsedChart = () => {
  const [data, setData] = useState<{ formName: string; count: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}form-usage`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Function to generate different blue tints
  const generateBlueShades = (count: number) => {
    const shades = [];
    for (let i = 0; i < count; i++) {
      const opacity = 0.9 - (i / count) * 0.5; // From 0.9 to 0.4 opacity
      shades.push(`rgba(54, 162, 235, ${opacity.toFixed(2)})`);
    }
    return shades;
  };  

  const backgroundColors = generateBlueShades(data.length);
  const borderColors = backgroundColors.map(color => color.replace(/0\.\d+/, '1')); // Full opacity for borders

  const chartData = {
    labels: data.map((item) => item.formName),
    datasets: [
      {
        label: "Number of Times Used",
        data: data.map((item) => item.count),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 0,
        borderRadius: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
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
