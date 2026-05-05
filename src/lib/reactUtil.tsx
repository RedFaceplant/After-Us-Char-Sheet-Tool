import { type AbilityEnhancement } from '../assets/abilityList';
import { abilityCostFormatter } from './util';

export const formatAbilityEnhancement = (enhancement: AbilityEnhancement) => {
  return(
    <>
        <b>{abilityCostFormatter(enhancement.cost, enhancement.degree)}</b> {enhancement.description}
    </>
  )
}