import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import chartService from './chartService';
import { ChartForm, Chart, Step } from '../../app/types';

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

export const updateChart = createAsyncThunk<
  Chart, // return type of the payload creator
  Chart, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('charts/update', async (chart, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.updateChart(chart, chart._id.toString(), token);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteChart = createAsyncThunk<
  Chart[], // return type of the payload creator
  string, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('charts/delete', async (chartId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chartService.deleteChart(chartId, token);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    updateChartName: (state, action: PayloadAction<string>) => {
      if (state.chart) state.chart.name = action.payload;
    },
    updateChartCurrent: (state, action: PayloadAction<string>) => {
      if (state.chart) state.chart.current = action.payload;
    },
    updateChartGoal: (state, action: PayloadAction<string>) => {
      if (state.chart) state.chart.goal = action.payload;
    },
    addStepToChart: (state, action: PayloadAction<Step>) => {
      if (state.chart) state.chart.steps.push(action.payload);
    },
    removeStepToChart: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      console.log(`removeStepToChart ${index}`);
      if (state.chart)
        state.chart.steps = state.chart.steps.filter((e, i) => i !== index);
    },
    updateStepDate: (
      state,
      action: PayloadAction<{ index: number; newDate: Date }>
    ) => {
      const { index, newDate } = action.payload;
      if (state.chart)
        state.chart.steps = state.chart.steps.map((e, i) => {
          if (i === index) return { ...e, date: newDate };
          else return e;
        });
    },
    updateStepText: (
      state,
      action: PayloadAction<{ index: number; newText: string }>
    ) => {
      const { index, newText } = action.payload;
      if (state.chart)
        state.chart.steps = state.chart.steps.map((e, i) => {
          if (i === index) return { ...e, text: newText };
          else return e;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      // deleteChart
      .addCase(deleteChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.charts = action.payload;
      })
      .addCase(deleteChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
      })

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

      // updateChart
      .addCase(updateChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chart = action.payload;
      })
      .addCase(updateChart.rejected, (state, action) => {
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

export const {
  reset,
  updateChartName,
  updateChartCurrent,
  updateChartGoal,
  addStepToChart,
  removeStepToChart,
  updateStepDate,
  updateStepText,
} = chartSlice.actions;
export default chartSlice.reducer;
