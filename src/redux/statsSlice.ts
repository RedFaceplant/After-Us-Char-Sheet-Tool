import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultStats, type Stats, type BaseStats, type SkillGroups, type Skills } from "../app/types";

type StatUpdate<T> = {
  key: keyof T;
  value: T[keyof T];
};

const statsSlice = createSlice({
    name: "stats",
    initialState: defaultStats,
    reducers: {
        setStats(
            state,
            action: PayloadAction<Partial<Stats>>
        ){
            Object.assign(state, action.payload)
        },
        setBaseStat(
            state,
            action: PayloadAction<StatUpdate<BaseStats>>
        ){
            const { key, value } = action.payload;

            state.baseStats[key] = value;
        },
        setSkillGroup(
            state,
            action: PayloadAction<StatUpdate<SkillGroups>>
        ){
            const { key, value } = action.payload;

            state.skillGroups[key] = value;
        },
        setSkill(
            state,
            action: PayloadAction<StatUpdate<Skills>>
        ){
            const { key, value } = action.payload;

            state.skills[key] = value;
        },
    }
})

export const{setStats, setBaseStat, setSkillGroup, setSkill} = statsSlice.actions;
export default statsSlice.reducer