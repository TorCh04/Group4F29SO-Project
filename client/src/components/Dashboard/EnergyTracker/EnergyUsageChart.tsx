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
        text: 'Energy Usage (Wh)',
        color: '#DAD6F8',
      },
    },
  },
};

async function getdataToday() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/energyData/today', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
  else {
    console.log('Error fetching data');
    return [];
  }
}

async function getdataLast7Days(): Promise<number[]> {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/energyData/week', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data: { energyUsage: number }[] = await response.json();
    return data.map((item) => item.energyUsage);
  } else {
    console.log('Error fetching data');
    return [];
  }
}

async function getdatalastMonth(): Promise<number[]> {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/energyData/month', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data: { energyUsage: number }[] = await response.json();
    return data.map((item) => item.energyUsage);
  } else {
    console.log('Error fetching data');
    return [];
  }
}

const getDataForTimeRange = async (timeRange: TimeRange): Promise<ChartData<'bar'>> => {
  switch (timeRange) {
    case 'today':
      return {
        labels: ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'],
        datasets: [
          {
            label: 'Energy Usage',
            data: await getdataToday(),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'last7Days':
      return {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Energy Usage',
            data: await getdataLast7Days(),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'lastMonth':
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'This Week'],
        datasets: [
          {
            label: 'Energy Usage',
            data: await getdatalastMonth(),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'custom':
      return {
        labels: ['Custom 1', 'Custom 2', 'Custom 3', 'Custom 4'],
        datasets: [
          {
            label: 'Energy Usage',
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    default:
      return {
        labels: [],
        datasets: [],
      };
  }
};

interface TrackerChartProps {
  timeRange: TimeRange;
}

const EnergyUsageChart: React.FC<TrackerChartProps> = ({ timeRange }) => {
  const [data, setData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataForTimeRange(timeRange);
      setData(result);
    };
    fetchData();
  }, [timeRange]);

  return (
    <div className="et_graph">
      <Bar data={data} options={options} />
    </div>
  );
};

export default EnergyUsageChart;