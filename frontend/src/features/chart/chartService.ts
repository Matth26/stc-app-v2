import axios from 'axios';
import { Chart } from './chartSlice';

const API_URL: string = '/api/charts';

// Register user
const createChart = async (chartData: Chart, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, chartData, config);

  return response.data;
};

const chartService = {
  createChart,
};

export default chartService;
