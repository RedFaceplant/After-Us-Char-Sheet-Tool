import { type RenderedAbility } from "../assets/abilityList"
import { formatAbilityEnhancement } from "../lib/reactUtil"
import { abilityCostFormatter, capitalFirst } from "../lib/util"

export function AbilityBlock({myAbility, removeAbility}: {myAbility: RenderedAbility, removeAbility: Function}){
    const abilityEnhancements = () => {
        const {enhancements, appliedEnhancementsList, enhancementMode} = myAbility

        if(!enhancements || !appliedEnhancementsList || appliedEnhancementsList.length == 0){
            return(<></>)
        }

        return (
            enhancements.map((enhancement, index) => {
                if(!appliedEnhancementsList[index]){
                    return(<></>)
                }
                return (
                    <>
                        <br />
                        + {formatAbilityEnhancement(enhancement, (enhancementMode == "stacking" && index != 0))}
                    </>
                )
            })
        )
    }

    const abilitySelectionFormatter = () => {
        const {dropdownSelection, dropdownMode} = myAbility

        if(!dropdownMode || dropdownMode == "none"){
            return ""
        }

        return (
            <>
            <span>[{capitalFirst(dropdownSelection?? "undefined")}]&nbsp;-&nbsp;</span>
            </>
        )
    }

    return (
        <li key={myAbility.id}>
            <button className={"delete-ability"} onClick={() => {removeAbility()}}>X</button>
            <b>{myAbility.name} {abilityCostFormatter(myAbility.cost, myAbility.degree)}&nbsp;-&nbsp;{abilitySelectionFormatter()}</b>
            {myAbility.description}
            {abilityEnhancements()}
        </li>
    )
}