import "../styles/App.css";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

import { AbilityBlock } from "./AbilityBlock";

export default function AbilityZone({ flawsZone }: { flawsZone?: boolean; }){
    const currentAbilities = useSelector(
      (state: RootState) => state.currentAbilities.abilities
    )
    
    return(
        <div>
            <b>{flawsZone ? "Flaws" : "Abilities"}</b>:
            <br />
            <div className={`${flawsZone ? "Flaws" : "Abilities"}-Body`}>
                <ul className="ability-list">
                    {currentAbilities.map((ability) => (
                        (ability.flaw && flawsZone) || (!ability.flaw && !flawsZone)? (
                            <AbilityBlock myAbility={ability}></AbilityBlock>
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