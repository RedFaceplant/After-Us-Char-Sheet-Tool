import { type AbilityExtra } from '../assets/abilityList';
import { abilityCostFormatter } from './util';

export const formatAbilityExtra = (extra: AbilityExtra) => {
  return(
    <>
        <b>{abilityCostFormatter(extra.cost, extra.degree)}</b> {extra.description}
    </>
  )
}