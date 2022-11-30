import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  defaultLabStats: {},
  monthlyLabAccesses: [],
};
export const labSlice = createSlice({
  initialState,
  name: "labSlice",
  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    getUserStats(state, { payload }) {
      state.isLoading = false;
      state.defaultLabStats = payload.defaultLabStats;
      state.monthlyLabAccesses = payload.monthlyLabAccesses;
    },
  },
});

const { reducer, actions } = labSlice;

export const { setLoading, getUserStats } = actions;
export default reducer;
