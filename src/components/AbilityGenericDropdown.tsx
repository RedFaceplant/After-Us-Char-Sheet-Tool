import { type DropdownModes, DROPDOWNS } from '../assets/abilityList'
import { capitalFirst } from '../lib/util'
import { getCurrentSpells, getDamageAffinities } from '../redux/selectors'
import { useAppSelector } from '../redux/hooks'

export default function AbilityGenericDropdown({
        optionSelected, 
        setOptionSelected, 
        dropdownMode,
    }: {
        optionSelected: string, 
        setOptionSelected: Function, 
        dropdownMode: DropdownModes | undefined,
    }){

    if(!dropdownMode || dropdownMode == "none"){
        return (<></>)
    }

    const currentDamageAffinities = useAppSelector(getDamageAffinities)
    const currentSpells = useAppSelector(getCurrentSpells)

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