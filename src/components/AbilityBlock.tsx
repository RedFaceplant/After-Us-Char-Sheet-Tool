import { type RenderedAbility } from "../assets/abilityList"
import { formatAbilityEnhancement } from "../lib/reactUtil"
import { abilityCostFormatter } from "../lib/util"

export function AbilityBlock({myAbility, removeAbility}: {myAbility: RenderedAbility, removeAbility: Function}){
    const abilityEnhancements = () => {
        const {enhancements, appliedEnhancementsList} = myAbility

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
                        + {formatAbilityEnhancement(enhancement)}
                    </>
                )
            })
        )
    }

    return (
        <li key={myAbility.id}>
            <button className={"delete-ability"} onClick={() => {removeAbility()}}>X</button>
            <b>{myAbility.name} {abilityCostFormatter(myAbility.cost, myAbility.degree)} </b>
            - {myAbility.description}
            {abilityEnhancements()}
        </li>
    )
}