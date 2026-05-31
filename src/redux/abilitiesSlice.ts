import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {type RenderedAbility} from "../assets/abilityList"

interface AbilityState {
    abilities: RenderedAbility[]
} 

const initialState: AbilityState = {
    abilities: []
}

const abilitiesSlice = createSlice({
    name: "abilities",
    initialState,
    reducers: {
        clearAbilities(state){ state.abilities = [] },
        addAbility(
            state,
            action: PayloadAction<RenderedAbility>
        ){
            state.abilities.push(action.payload)
        },
        setAbilities(
            state,
            action: PayloadAction<RenderedAbility[]>
        ){
            state.abilities = action.payload
        },
        RemoveAbility(
            state,
            action: PayloadAction<RenderedAbility>
        ){
            state.abilities = state.abilities.filter(
                ability => ability.id !== action.payload.id
            )
        }
    }
})

export const{clearAbilities, addAbility, setAbilities, RemoveAbility} = abilitiesSlice.actions;
export default abilitiesSlice.reducer