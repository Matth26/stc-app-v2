import axios from 'axios';
import { CreateChartProps } from './chartSlice';

const API_URL: string = '/api/charts';

const createChart = async (chartData: CreateChartProps, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, chartData, config);

  return response.data;
};

const getCharts = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getChart = async (chartId: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL + '/' + chartId, config);

  return response.data;
};

const chartService = {
  createChart,
  getCharts,
  getChart,
};

export default chartService;
