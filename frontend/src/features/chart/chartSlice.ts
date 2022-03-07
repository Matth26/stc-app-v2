import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import chartService from './chartService';

export interface Chart {
  name: string;
  goal: string;
  current: string;
}

interface ChartState {
  charts: Chart[];
  chart: Chart | {};
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ChartState = {
  charts: [],
  chart: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

interface APICreateChartData {
  //_id: user._id,
  name: string;
  goal: string;
  current: string;
}

export const createChart = createAsyncThunk<
  APICreateChartData, // return type of the payload creator
  Chart, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('chart/create', async (chartData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.createChart(chartData, token);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      // createChart
      .addCase(createChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
      });
  },
});

export const { reset } = chartSlice.actions;
export default chartSlice.reducer;
