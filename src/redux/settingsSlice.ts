import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Settings, defaultSettings } from "../app/types";

const settingsSlice = createSlice({
    name: "settings",
    initialState: defaultSettings,
    reducers: {
        setSettings(
            state,
            action: PayloadAction<Partial<Settings>>
        ){
            Object.assign(state, action.payload)
        },
    }
})

export const{setSettings} = settingsSlice.actions;
export default settingsSlice.reducer