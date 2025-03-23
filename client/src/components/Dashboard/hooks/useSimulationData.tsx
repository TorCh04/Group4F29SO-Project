import { useEffect, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SimulationData {
  humidity: number | null;
  temperature: number | null;
}

const useSimulationData = () => {
  const [data, setData] = useState<SimulationData>({ humidity: null, temperature: null });

  const fetchSimulationData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/getSimulationData`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      console.log('Fetched simulation data:', result);
      if (response.ok) {
        setData(result);
      } else {
        console.error('Error fetching simulation data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching simulation data:', error);
    }
  };

  useEffect(() => {
    fetchSimulationData(); // Fetch data initially
    const interval = setInterval(fetchSimulationData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return data;
};

export default useSimulationData;