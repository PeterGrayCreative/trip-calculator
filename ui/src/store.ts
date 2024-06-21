import { configureStore } from '@reduxjs/toolkit';
import { tripCalculatorAPI } from './services/tripAPI';

export const store = configureStore({
  reducer: {
    [tripCalculatorAPI.reducerPath]: tripCalculatorAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tripCalculatorAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch