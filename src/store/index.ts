import { configureStore } from '@reduxjs/toolkit';
import landingReducer from './slices/landingSlice';
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    notification: notificationReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch