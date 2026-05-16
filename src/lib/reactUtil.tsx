import { type AbilityEnhancement } from '../assets/abilityList';
import { abilityCostFormatter } from './util';

export const formatAbilityEnhancement = (enhancement: AbilityEnhancement, requiresPrevious: boolean = false) => {
  return(
    <>
        <b>{abilityCostFormatter(enhancement.cost, enhancement.degree)}{requiresPrevious ? " Requires Previous -" : ""}</b> {enhancement.description}
    </>
  )
}