import { type RenderedAbility } from "../assets/abilityList"
import { formatAbilityExtra } from "../lib/reactUtil"
import { abilityCostFormatter } from "../lib/util"

export function AbilityBlock({myAbility, removeAbility}: {myAbility: RenderedAbility, removeAbility: Function}){
    const abilityExtras = () => {
        const {extras, appliedExtrasList} = myAbility

        if(!extras || !appliedExtrasList || appliedExtrasList.length == 0){
            return(<></>)
        }

        return (
            extras.map((extra, index) => {
                if(!appliedExtrasList[index]){
                    return(<></>)
                }
                
                return (
                    <>
                        <br />
                        + {formatAbilityExtra(extra)}
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
            {abilityExtras()}
        </li>
    )
}