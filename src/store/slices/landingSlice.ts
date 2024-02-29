import { createSlice,PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LandingState {
    animate: boolean
}

// Define the initial state using that type
const initialState: LandingState = {
  animate: true,
}

export const landingSlice = createSlice({
  name: 'landing',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startRotate: (state) => {
      state.animate = true
    },
    stopRotate: (state) => {
      state.animate = false
    },
    assignValue: (state, action: PayloadAction<boolean>) => {
      state.animate = action.payload;
    }
  }
})

export const { startRotate, stopRotate,assignValue } = landingSlice.actions;

export default landingSlice.reducer;