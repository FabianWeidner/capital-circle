import React from 'react';
import { Line, Chart } from 'react-chartjs-2';
import 'chart.js/auto';

interface AssetChartData {
  date: string;
  price: number;
}

interface AssetChartProps {
  data: AssetChartData[];
}

const AssetChart: React.FC<AssetChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Preis',
        data: data.map((item) => item.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Chart
      type="line"
      data={chartData}
      options={options}
      height={400}
      width={600}
    />
  );
};

export default AssetChart;
