import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = 'today' | 'last7Days' | 'lastMonth' | 'custom';

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#DAD6F8',
      },
    },
    title: {
      display: false,
      text: 'Bar Chart Example',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#DAD6F8',
      },
    },
    y: {
      ticks: {
        color: '#DAD6F8',
      },
      title: {
        display: true,
        text: 'Energy Generated (kWh)',
        color: '#DAD6F8',
      },
    },
  },
};

async function getdataToday() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/energyDataG/todayEG`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data: { energyGenerated: number }[] = await response.json();
    console.log(data);
    return data.map((item) => item.energyGenerated);
  } else {
    console.log('Error fetching data');
    return [];
  }
}

async function getdataLast7Days() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/energyDataG/weekEG`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data: { energyGenerated: number }[] = await response.json();
    console.log(data);
    return data.map((item) => item.energyGenerated);
  } else {
    console.log('Error fetching data');
    return [];
  }
}

async function getdatalastMonth() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/energyDataG/monthEG`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data: { energyGenerated: number }[] = await response.json();
    console.log(data);
    return data.map((item) => item.energyGenerated);
  } else {
    console.log('Error fetching data');
    return [];
  }
}

const EnergyGeneratedChart: React.FC<{ timeRange: TimeRange }> = ({ timeRange }) => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let data: number[] = [];
      let labels: string[] = [];

      switch (timeRange) {
        case 'today':
          data = await getdataToday();
          labels = ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'];
          break;
        case 'last7Days':
          data = await getdataLast7Days();
          labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
          break;
        case 'lastMonth':
          data = await getdatalastMonth();
          labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          break;
        default:
          data = [];
          labels = [];
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Energy Generated',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, [timeRange]);

  return (
    <div className="et_graph">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EnergyGeneratedChart;