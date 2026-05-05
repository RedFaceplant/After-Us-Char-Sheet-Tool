import * as R from 'ramda';
import { type Prereq} from '../assets/abilityList';
import { type BaseStatsId, type Degrees } from '../app/types';

export function capitalFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomString(){
  return (Math.random()).toString().slice(2)
}

// Pulled from online
export const toKebabCase = R.pipe(
  R.replace(/([a-z])([A-Z])/g, '$1-$2'), // Insert hyphen between camelCase words
  R.replace(/[\s_]+/g, '-'),             // Replace spaces and underscores with hyphens
  R.toLower                              // Convert entire string to lowercase
);

// From GPT, then modified
export function formatPrereqs(prereq?: Prereq): string {
  if (!prereq) return "none";

  const parts: string[] = [];

  // Handle base
  if (prereq.base) {
    for (const [key, value] of Object.entries(prereq.base)) {
      parts.push(`${capitalFirst(key)} ${value}`);
    }
  }

  // Handle skill
  if (prereq.skill) {
    for (const [key, value] of Object.entries(prereq.skill)) {
      parts.push(`${capitalFirst(key)} ${value}`);
    }
  }

  // Handle abilities
  if (prereq.abilities) {
    parts.push(...prereq.abilities);
  }

  return parts.length ? parts.join(", ") : "none";
}


/** Returns true if checkDegree is greater than or equal to degreeRequirement 
 * @param checkDegree the degree to test with
 * @param degreeRequirement the degree to compare against
*/
export function degreeRequirementMet(checkDegree: Degrees, degreeRequirement: Degrees): Boolean{
  // You can never be below a normal degree, therefore this is an Early pass.
  if(degreeRequirement === "normal"){
    return true
  }

  // If degrees are equal, we already meet the requirements. Early pass.
  if(checkDegree === degreeRequirement){
    return true
  }

  // At this point, we know degreeRequirement is at least Amazing, and we know the degrees do not match.
  if(degreeRequirement === "amazing"){
    return (checkDegree === "epic" || checkDegree === "divine")
  }

  if(degreeRequirement === "epic"){
    return (checkDegree === "divine")
  }

  // We don't need to test for checkDegree being divine, because you can't be above divine and we already tested for equality.

  // CheckDegree must be lesser than the degreeRequirement, return false.
  return false
}

/**
 * converts an ability's cost and degree into a formatted block that's used in the After Us Docs.
 * For example, a Normal 10 cost ability becomes (10). An Amazing 20 cost ability becomes (20/A)
 * @returns the formatted string
 */
export function abilityCostFormatter(cost: number, degree: Degrees | undefined): string{
  if(!degree || degree === "normal"){
      return (`(${cost})`)
  }
  
  return (`(${cost}/${degree[0].toUpperCase()})`)
}

/**
 * Takes in any base stat and returns the three letter shorthand for that stat
 */
export function baseStatToShorthand(baseStat: BaseStatsId): string{
  switch(baseStat){
    case 'strength':
      return "STR"
    case 'agility':
      return "AGL"
    case "vigor":
      return "VIG"
    case "reason":
      return "REA"
    case "instinct":
      return "INS"
  }
}