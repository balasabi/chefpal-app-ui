import { createSlice,PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AlertState {
    openAlert: boolean,
    alertSeverity: string
    alertMessage: string
}

// Define the initial state using that type
const initialState: AlertState = {
    openAlert: false,
    alertSeverity:"",
    alertMessage: ""
}

export const notificationSlice = createSlice({
 name: 'notification',
  initialState,
  reducers: {
    displayAlert: (state,  action: PayloadAction<AlertState>) => {
        state.openAlert = action.payload.openAlert;
        state.alertSeverity = action.payload.alertSeverity;
        state.alertMessage = action.payload.alertMessage;
      },
  }
})

export const { displayAlert } = notificationSlice.actions;
export default notificationSlice.reducer;