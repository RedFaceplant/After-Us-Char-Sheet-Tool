import { type Stats, sizeModifiers, type Sizes }  from "../app/types"
import { type RenderedAbility } from "../assets/abilityList"

function baseStatLevelToXP(n: number): number {
  const levels = n - 1; // number of level-ups
  return (
    10 * Math.min(Math.max(levels, 0), 4) +
    20 * Math.min(Math.max(levels - 4, 0), 5) +
    30 * Math.min(Math.max(levels - 9, 0), 5) +
    40 * Math.min(Math.max(levels - 14, 0), 5)
  );
}

function groupLevelToXP(n: number): number {
  const levels = n - 1; // number of level-ups
  return (
    10 * Math.min(Math.max(levels, 0), 4) +
    30 * Math.min(Math.max(levels - 4, 0), 5) +
    50 * Math.min(Math.max(levels - 9, 0), 5)
  );
}

function skillLevelToXP(n: number): number {
  const levels = n - 1; // number of level-ups
  return (
    3 * Math.min(Math.max(levels, 0), 4) +
    6 * Math.min(Math.max(levels - 4, 0), 5) +
    11 * Math.min(Math.max(levels - 9, 0), 5)
  );
}

export function calculateXP(stats: Stats, size: Sizes, abilities: RenderedAbility[]){
    const {baseStats, skillGroups, skills} = stats
    let count = 0

    count += sizeModifiers[size].xpModifier

    for(let baseStat of Object.keys(baseStats)){
        count += baseStatLevelToXP(baseStats[baseStat])
    }

    for(let group of Object.keys(skillGroups)){
        count += groupLevelToXP(skillGroups[group])
    }

    for(let skill of Object.keys(skills)){
        count += skillLevelToXP(skills[skill])
    }

    for(let abilitiy of abilities){
      count += abilitiy.cost
      if(abilitiy.extras && abilitiy.appliedExtrasList){
        abilitiy.extras.map((extra, index) => {
          if(abilitiy.appliedExtrasList[index]){
            count += extra.cost
          }
        })
      }
    }

    return count

}