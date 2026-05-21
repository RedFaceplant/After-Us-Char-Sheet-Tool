import { useState, useEffect, useMemo } from "react";
import ConfirmDialog from "../lib/ConfirmDialog";
import {type Categories, type RenderedAbility, abilities, type Ability, type AbilityEnhancement, type EnhancementModes} from "../assets/abilityList"
import { randomString, formatPrereqs, degreeRequirementMet, capitalFirst, booleansRequirePrevious, sizeOrder } from "../lib/util";
import { type Stats } from "../app/types";
import { formatAbilityEnhancement } from "../lib/reactUtil";
import AbilityGenericDropdown from "./AbilityGenericDropdown";

export default function AbilityButton({
        currentAbilities, 
        setCurrentAbilities, 
        stats, 
        currentDamageAffinities, 
        currentSpells
    }: {
        currentAbilities: RenderedAbility[], 
        setCurrentAbilities: Function, 
        stats: Stats, 
        currentDamageAffinities: string[], 
        currentSpells: string[]
    }){
    const [showAbilitySelect, setShowAbilitySelect] = useState(false); // The actual pop up menu showing
    const [selectedGroup, setSelectedGroup] = useState<Categories>("combat" as const) // The selected catergory
    const [options, setOptions] = useState<string[]>([]); // All abilities in the selected catergory
    const [selectedAbility, setSelectedAbility] = useState<string>("") // Currently selected ability
    const [showPrereqWarning, setShowPrereqWarning] = useState(false); // Controls the pop up warning that the ability couldn't be added
    const [warningMode, setWarningMode] = useState("prereq"); // Controls what the pop up warning will say
    const [abilityDropdownSelection, setAbilityDropdownSelection] = useState("null"); // Dropdown on abilities that use it


    // Update the abilities dropdown whenever the group dropdown changes
    useEffect(() => {
        const abilityNames = abilities[selectedGroup].map((ability) => ability.name);
        setOptions(abilityNames);
        setAbilityDropdownSelection("null")
    }, [selectedGroup]);

    // Get the full ability out of the list
    const getCurrentAbility = () => {
        return abilities[selectedGroup].find(obj => obj.name == selectedAbility)
    }

    // returns false if any prereqs aren't met
    const abilityPrereqsMet = (fullAbility: Ability) => {
        const prereqs = fullAbility.prereq
        // Early return if there are no prereqs found
        if(!prereqs){
            return true
        }

        // Check all base stats on prereqs
        for(const baseStat in prereqs.base){
            if(stats.baseStats[baseStat] < prereqs.base[baseStat]){
                return false
            }
        }

        // Check all skills on prereqs
        for(const skill in prereqs.skill){
            if(stats.skills[skill] < prereqs.skill[skill]){
                return false
            }
        }

        // Size Prereq
        if(prereqs.smallerThan){
            return sizeOrder[stats.characterInfo.size] < sizeOrder[prereqs.smallerThan]
        }

        // Check if ability prereqs are met
        if(prereqs.abilities){
            return prereqs.abilities.every(ability => currentAbilities.some(a => a.name === ability))
        }
        return true
    }

    // All the checks and logic that goes into actually adding an ability onto the sheet
    const addAbility = () => {
        // Make the pop-up hide
        setShowAbilitySelect(false);

        // Get the whole ability from the list, not just the name.
        const fullAbility = getCurrentAbility()

        // Can't find the ability. Return early.
        if(!fullAbility){
            console.error(`Ability '${selectedAbility}' not found!`)
            return
        }

        // Does the character meet the degree requirement for this ability?
        if(fullAbility.degree && !degreeRequirementMet(stats.characterInfo.degree, fullAbility.degree)){
            setWarningMode("degree")
            setShowPrereqWarning(true)
            return
        }

        // Abilities can't be put on the same sheet more than one time unless they have the stackable flag. Early return.
        if(!fullAbility.stackable && currentAbilities.find(obj => obj.name == selectedAbility)){
            setWarningMode("unstackable")
            setShowPrereqWarning(true)
            return
        }

        if(fullAbility.dropdownMode != "none" && currentAbilities.find(obj => obj.name == selectedAbility && obj.dropdownSelection == abilityDropdownSelection)){
            setWarningMode("dropdownStacking")
            setShowPrereqWarning(true)
            return
        }

        // Early return if a mutually exclusive ability is already on the sheet.
        if(fullAbility.exclusive && currentAbilities.find(obj => obj.name == fullAbility.exclusive)){
            setWarningMode("exclusive")
            setShowPrereqWarning(true)
            return  
        }

        // Early return if the sheet doesn't meet all prerequirements for the ability
        if(!abilityPrereqsMet(fullAbility)){
            setWarningMode("prereq")
            setShowPrereqWarning(true)
            return
        }

        const buttonStatus: boolean[] = []
        let stopFlag = false
        
        // Get enhancement button status and check enhancements for degree requirements
        if(fullAbility.enhancements){
            fullAbility.enhancements.map((enhancement, index) => {
                const checkbox = document.getElementById(`${selectedAbility}-${index}`) as HTMLInputElement
                buttonStatus[index] = checkbox.checked

                if(checkbox.checked && !degreeRequirementMet(stats.characterInfo.degree, enhancement.degree ?? "normal")){
                    stopFlag = true
                }
            })
        }

        if(stopFlag){
            setWarningMode("degree-enhancement")
            setShowPrereqWarning(true)
            return
        }

        if(fullAbility.enhancementMode == "stacking" && !booleansRequirePrevious(buttonStatus)){
            setWarningMode("enhancement-stacking")
            setShowPrereqWarning(true)
            return
        }

        // Convert the ability from list format to sheet format
        const convertedAbility: RenderedAbility = {
            ...fullAbility,
            flaw: selectedGroup == 'flaws',
            id: randomString(),
            appliedEnhancementsList: buttonStatus,
            dropdownSelection: abilityDropdownSelection
        }

        // Actually add the ability into the list
        setCurrentAbilities([...currentAbilities, convertedAbility])
    }

    const abilityEnhancementOptions = (enhancements: AbilityEnhancement[], enhancementMode: EnhancementModes = "none") => {
        if(!enhancements || enhancementMode === "none"){
            return (<></>)
        }

        return (
            <div>
                <hr />
                <form>
                    {enhancements.map((enhancement, index) => (
                    <>
                        <input type="checkbox" id={`${selectedAbility}-${index}`} key={`${selectedAbility}-${index}`} />
                        <label htmlFor={`${selectedAbility}-${index}`}>
                            {formatAbilityEnhancement(enhancement, (enhancementMode == "stacking" && index != 0))}
                        </label>
                        <br />
                    </>
                ))}
                </form>
            </div>
        )
    }

    const abilityBreakdown = () => {
        return useMemo(() => {
            const { cost, degree, prereq, description, enhancements, enhancementMode, dropdownMode } = getCurrentAbility() ?? {}

            return (
            <div>
                <b>Cost: </b><span>{cost ?? '-'}</span>
                <br />
                <b>Degree: </b><span>{capitalFirst(degree ?? "Normal")}</span>
                <br />
                <b>Prereq: </b><span>{formatPrereqs(prereq)}</span>
                <br />
                <AbilityGenericDropdown 
                    optionSelected={abilityDropdownSelection} 
                    setOptionSelected={setAbilityDropdownSelection} 
                    dropdownMode={dropdownMode}
                    currentDamageAffinities={currentDamageAffinities}
                    currentSpells={currentSpells}
                />
                <span>{description ?? '(Select an Ability)'}</span>
                {enhancements ? abilityEnhancementOptions(enhancements, enhancementMode) : <></>}
            </div>
        )
        }, [selectedAbility, abilityDropdownSelection])
    }

    return (
    <div>
        <button className="ability-button" onClick={
            () => {
                setShowAbilitySelect(true)
            }
        }>Add Ability</button>
        <ConfirmDialog abilityModal={true} showConfirm={showAbilitySelect} onConfirm={() => {
            addAbility()
        }} onCancel={() => {
            setShowAbilitySelect(false)
        }}>
            <label className="ability-label">
                Show Catergory:
                <select
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value as Categories)}
                >
                    <option value="combat">Combat</option>
                    <option value="magic">Magic</option>
                    <option value="personal">Personal</option>
                    <option value="skills">Skills</option>
                    <option value="flaws">Flaws</option>
                </select>
            </label>
            <br />
            <label className="ability-label">
                Select Ability:
                <select
                value={selectedAbility}
                onChange={e => setSelectedAbility(e.target.value)}
                >
                <option value="">- Select an option -</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </label>
            <hr />
            {abilityBreakdown()}
        </ConfirmDialog>
        <ConfirmDialog
            showConfirm={showPrereqWarning}
            confirmText=""
            onConfirm={() => setShowPrereqWarning(false)}
            onCancel={() => setShowPrereqWarning(false)}
        >
            {   warningMode == "prereq" ?
                (<>
                    <span>Can't add ability '{selectedAbility}'. Sheet is missing Prerequirements:</span>
                    <br />
                    <span>{formatPrereqs(getCurrentAbility()?.prereq)}</span>
                </>)
            :   warningMode == "unstackable" ?
                (<>
                    <span>The ability '{selectedAbility}' can't be aquired more than once</span>
                </>)
            :   warningMode == "dropdownStacking" ?
                (<>
                    <span>The ability '{selectedAbility}' can't be aquired more than once with the selection '{capitalFirst(abilityDropdownSelection)}'</span>
                </>)
            :   warningMode == "degree" ?
                (<>
                    <span>The ability '{selectedAbility}' requires sheet to be a degree of at least '{capitalFirst(getCurrentAbility()?.degree ?? "undefined")}'</span>
                </>)
            :   warningMode == "degree-enhancement" ?
                (<>
                    <span>Sheet does not meet degree requirements for a selected enhancement on the ability '{selectedAbility}'</span>
                </>)
            :   warningMode == "enhancement-stacking" ?
                (<>
                    <span>Enhancement on the ability '{selectedAbility}' requires a previous enhancement that was not selected</span>
                </>)
            :
                (<>
                    <span>The ability '{selectedAbility}' is mutually exclusive with the already present ability '{getCurrentAbility()?.exclusive}'</span>
                </>)
        }
        </ConfirmDialog>
    </div>
    )
}