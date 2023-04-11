import { createSlice } from "@reduxjs/toolkit";

const StateManager = createSlice({
  name: "stateManager",
  initialState: {
    apiResponse: {},
    IsAuth: false,
    loadingStatus:false,
  },
  reducers: {
    setApiResponse: (state, payload) => {
      console.log(payload);
      state.apiResponse = payload;
    },
    setIsAuth: (state, payload) => {
      state.IsAuth = payload.payload;
      console.log(state.IsAuth);
    },
    setLoading: (state ,payload) => {
      state.loadingStatus==payload
    }
  },
});

export const { setApiResponse, setIsAuth, setLoading } = StateManager.actions;
export default StateManager.reducer;
