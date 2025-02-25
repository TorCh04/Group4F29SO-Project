import React from 'react';
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
      }
    },
    title: {
      display: false,
      text: 'Bar Chart Example',
    },
  }, // Close the plugins object here
  scales: { // Move scales to the top level
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
        text: 'Energy Usage (kWh)', // Y-axis label
        color: '#DAD6F8'
      },
    },
  },
};

const getDataForTimeRange = (timeRange: TimeRange) => {
  switch (timeRange) {
    case 'today':
      return {
        labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [
          {
            label: 'Energy Usage (Today)',
            data: [30, 40, 50, 60, 70, 80, 90, 100], 
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'last7Days':
      return {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            label: 'Energy Usage (Last 7 Days)',
            data: [65, 59, 80, 81, 56, 55, 40], 
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'lastMonth':
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Energy Usage (Last Month)',
            data: [200, 300, 250, 400], 
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
            label: 'Energy Usage (Custom)',
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
  const data = getDataForTimeRange(timeRange); 

  return (
    <div className="et_graph">
      <Bar data={data} options={options} />
    </div>
  );
};

export default EnergyUsageChart;