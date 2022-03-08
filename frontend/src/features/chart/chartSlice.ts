import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import chartService from './chartService';
import { ChartForm, Chart } from '../../app/types';

interface ChartState {
  charts: Chart[];
  chart: Chart | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ChartState = {
  charts: [],
  chart: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createChart = createAsyncThunk<
  ChartForm, // return type of the payload creator
  ChartForm, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('charts/create', async (chartData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.createChart(chartData, token);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

/*interface APIGetUserCHarts {
  //_id: user._id,
  : string;
  goal: string;
  current: string;
}*/

export const getUserCharts = createAsyncThunk<
  Chart[], // return type of the payload creator
  void, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('charts/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.getCharts(token);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getChart = createAsyncThunk<
  Chart, // return type of the payload creator
  string, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('charts/getOne', async (chartId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.getChart(chartId, token);
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
      .addCase(createChart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
      })

      // getUserCharts
      .addCase(getUserCharts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCharts.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.isSuccess = true;
        state.charts = action.payload;
      })
      .addCase(getUserCharts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
      })

      // getChart
      .addCase(getChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chart = action.payload;
      })
      .addCase(getChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
      });
  },
});

export const { reset } = chartSlice.actions;
export default chartSlice.reducer;
