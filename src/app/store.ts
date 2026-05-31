import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../redux/settingsSlice";
import abilitiesReducer from "../redux/abilitiesSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    currentAbilities: abilitiesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;