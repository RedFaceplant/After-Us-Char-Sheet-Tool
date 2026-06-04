import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../redux/settingsSlice";
import abilitiesReducer from "../redux/abilitiesSlice";
import metaInfoReducer from "../redux/metaSlice";
import StatsReducer from "../redux/statsSlice";



export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    currentAbilities: abilitiesReducer,
    metaInfo: metaInfoReducer,
    stats: StatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;