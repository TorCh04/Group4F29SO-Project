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


function generateFakeData(timeRange: TimeRange): number[] {
  let intervals: number;
  switch (timeRange) {
    case 'today':
      intervals = 8;
      break;
    case 'last7Days':
      intervals = 7;
      break;
    case 'lastMonth':
      intervals = 4;
      break;
    default:
      intervals = 0;
  }
  // Generate a random number between 100 and 1000 for each interval
  return Array.from({ length: intervals }, () => Math.floor(Math.random() * 900) + 100);
}


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
    console.log(data);
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
    console.log(data);
    return data.map((item) => item.energyUsage);
  } else {
    console.log('Error fetching data');
    return [];
  }
}


const getDataForTimeRange = async (timeRange: TimeRange): Promise<ChartData<'bar'>> => {
  // Example flag to switch between actual API calls and fake data.
  const useFakeData = false;  //change this to true to use fake data

  if (useFakeData) {
    // If using fake data, call generateFakeData based on the time range.
    return {
      labels: timeRange === 'today'
        ? ['12AM-3AM', '3AM-6AM', '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM']
        : timeRange === 'last7Days'
          ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          : timeRange === 'lastMonth'
            ? ['Week 1', 'Week 2', 'Week 3', 'This Week']
            : [],
      datasets: [
        {
          label: 'Energy Usage',
          data: generateFakeData(timeRange),
          backgroundColor: timeRange === 'today'
            ? 'rgba(75, 192, 192, 0.6)'
            : timeRange === 'last7Days'
              ? 'rgba(153, 102, 255, 0.6)'
              : timeRange === 'lastMonth'
                ? 'rgba(255, 159, 64, 0.6)'
                : 'rgba(255, 99, 132, 0.6)',
          borderColor: timeRange === 'today'
            ? 'rgba(75, 192, 192, 1)'
            : timeRange === 'last7Days'
              ? 'rgba(153, 102, 255, 1)'
              : timeRange === 'lastMonth'
                ? 'rgba(255, 159, 64, 1)'
                : 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  } else {
    // API calls for real data (replace this with your actual fetching logic)
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
      default:
        return { labels: [], datasets: [] };
    }
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