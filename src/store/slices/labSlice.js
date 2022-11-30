import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  stats: {},
  monthlyLabAccesses: [],
};
export const labSlice = createSlice({
  initialState,
  name: "labSlice",
  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    showStats(state, { payload }) {
      state.isLoading = false;
      state.stats = payload.stats;
      state.monthlyLabAccesses = payload.monthlyLabAccesses;
    },
  },
});

const { reducer, actions } = labSlice;

export const { setLoading, showStats } = actions;
export default reducer;
