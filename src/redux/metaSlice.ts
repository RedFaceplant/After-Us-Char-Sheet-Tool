import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type MetaInfo, defaultMetaInfo } from "../app/types";

const metaSlice = createSlice({
    name: "metaInfo",
    initialState: defaultMetaInfo,
    reducers: {
        setMetaInfo(
            state,
            action: PayloadAction<Partial<MetaInfo>>
        ){
            Object.assign(state, action.payload)
        },
    }
})

export const{setMetaInfo} = metaSlice.actions;
export default metaSlice.reducer