import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("my thunk function", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=31.20&lon=29.92&appid=248c766b17479d08e1ab6436b48827cc"
  );
  const responseTemp = Math.round(response.data.main.temp - 272.15);
  const responseTempMax = Math.round(response.data.main.temp_max - 272.15);
  const responseTempMin = Math.round(response.data.main.temp_min - 272.15);
  const responseState = response.data.weather[0].description;
  const responseIcon = response.data.weather[0].icon;
  console.log("despatching fetch weather from the tempSlice");
  return {
    responseTemp,
    responseTempMax,
    responseTempMin,
    responseState,
    responseIcon,
  };
});

export const tempSlice = createSlice({
  name: "weatherApi",
  initialState: {
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (currentState, action) => {
      console.log(currentState.result);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (currentState, action) => {
        currentState.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (currentState, action) => {
        currentState.isLoading = false;
        currentState.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (currentState, action) => {
        currentState.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { changeResult } = tempSlice.actions;

export default tempSlice.reducer;
