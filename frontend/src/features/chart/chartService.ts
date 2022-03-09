import axios from 'axios';
import { ChartForm, Chart, Step } from '../../app/types';

const API_URL: string = '/api/charts';

const createChart = async (
  chartData: ChartForm,
  token: string
): Promise<Chart> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post<Chart>(API_URL, chartData, config);

  // Set the date from string to Date Object
  response.data.steps = response.data.steps.map((s: Step) => {
    return { ...s, date: new Date(s.date) };
  });

  return response.data;
};

const getChart = async (chartId: string, token: string): Promise<Chart> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get<Chart>(API_URL + '/' + chartId, config);

  // Set the date from string to Date Object
  response.data.steps = response.data.steps.map((s: Step) => {
    return { ...s, date: new Date(s.date) };
  });

  return response.data;
};

const updateChart = async (
  chartData: ChartForm,
  chartId: string,
  token: string
): Promise<Chart> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put<Chart>(
    API_URL + '/' + chartId,
    chartData,
    config
  );

  // Set the date from string to Date Object
  response.data.steps = response.data.steps.map((s: Step) => {
    return { ...s, date: new Date(s.date) };
  });

  return response.data;
};

const getCharts = async (token: string): Promise<Chart[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get<Chart[]>(API_URL, config);

  return response.data;
};

const deleteChart = async (
  chartId: string,
  token: string
): Promise<Chart[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete<Chart[]>(API_URL + '/' + chartId, config);

  return response.data;
};

const chartService = {
  createChart,
  updateChart,
  getCharts,
  getChart,
  deleteChart,
};

export default chartService;
