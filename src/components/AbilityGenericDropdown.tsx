import { type DropdownModes, DROPDOWNS } from '../assets/abilityList'
import { capitalFirst } from '../lib/util'

export default function AbilityGenericDropdown({
        optionSelected, 
        setOptionSelected, 
        dropdownMode,
        currentDamageAffinities,
        currentSpells,
    }: {
        optionSelected: string, 
        setOptionSelected: Function, 
        dropdownMode: DropdownModes | undefined,
        currentDamageAffinities: string[], 
        currentSpells: string[]
    }){

    if(!dropdownMode || dropdownMode == "none"){
        return (<></>)
    }

    const Dropdowns = {
        ...DROPDOWNS,
        currentDamageAffinities,
        currentSpells,
    }

    return (
        <>
        <span><b>Choose one:&nbsp;</b>
            <select
            value={optionSelected}
            onChange={e => setOptionSelected(e.target.value)}
            defaultValue={Dropdowns[dropdownMode][0]}
            >
                {Dropdowns[dropdownMode].map((option) => <option value={option}>{capitalFirst(option)}</option>)}
            </select>
        </span>
        <br />
        </>
    )
}