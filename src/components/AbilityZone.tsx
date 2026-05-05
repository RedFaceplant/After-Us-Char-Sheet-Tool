import "../styles/App.css";
import { AbilityBlock } from "./AbilityBlock";
import {type RenderedAbility} from "../assets/abilityList"

export default function AbilityZone({ currentAbilities, setCurrentAbilities, flawsZone }: { currentAbilities: RenderedAbility[], setCurrentAbilities: Function, flawsZone?: boolean; }){
    const removeAbility = (myAbility: RenderedAbility) => {
        setCurrentAbilities(
            currentAbilities.filter(abilities => abilities.id !== myAbility.id)
        );
    }
    
    return(
        <div>
            <b>{flawsZone ? "Flaws" : "Abilities"}</b>:
            <br />
            <div className={`${flawsZone ? "Flaws" : "Abilities"}-Body`}>
                <ul className="ability-list">
                    {currentAbilities.map((ability) => (
                        (ability.flaw && flawsZone) || (!ability.flaw && !flawsZone)? (
                            <AbilityBlock myAbility={ability} removeAbility={() => {
                                removeAbility(ability)
                            }}></AbilityBlock>
                        ) : (
                            <></>
                        )
                    ))}
                </ul>
            </div>
            <hr />
        </div>
    )
}