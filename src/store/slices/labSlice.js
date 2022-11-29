import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {},
  monthlyLabAccesses,
  isLoading: false,
};

export const labSlice = createSlice({
  initialState,
  name: "labSlice",
  reducers: {
    setLabsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    getUserStats(state, { payload }) {
      state.stats = payload.defaultLabStats;
      state.monthlyLabAccesses = payload.monthlyLabAccesses;
    },
  },
});
const { reducer, actions } = labSlice;

export const { setLabsLoading, getUserStats, updateProfileSuccess } = actions;

export default reducer;
