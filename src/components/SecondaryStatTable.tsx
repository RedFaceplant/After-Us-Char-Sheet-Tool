import "../styles/App.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

import {type Stats, type Sizes, sizeModifiers} from "../app/types"
import {calculateXP} from '../lib/xpCalculation'
import type { RenderedAbility } from "../assets/abilityList";
import { capitalFirst } from "../lib/util"

const secondaryStatRows = [
  ["xp", "hp"],
  ["fl", "al"],
  ["mov", "dfn"],
] as const;

const sizeOptions = Object.keys(sizeModifiers) as Array<keyof typeof sizeModifiers>;

// From GPT
function countSelectedAbilities(
  abilities: RenderedAbility[],
  namesToTrack: string[]
): Record<string, number> {
  const counts: Record<string, number> = {};

  // Initialize only the keys you care about
  for (const name of namesToTrack) {
    counts[name] = 0;
  }

  for (const ability of abilities) {
    if (ability.name in counts) {
      counts[ability.name]++;
    }
  }

  return counts;
}

const trackedAbilities = [
  "Extra Fatigue Limit",
  "Extra Health Points",
  "Extra Magic Limit",
];

export default function SecondaryStatTable({stats, setStats}: {stats: Stats, setStats: Function}){
    const { baseStats, characterInfo: { size, modifier, degree } } = stats

    const abilities = useSelector(
      (state: RootState) => state.currentAbilities.abilities
    )

    const xp = useMemo(() => calculateXP(stats, abilities), [stats, abilities]);

    const abilityCounts = countSelectedAbilities(abilities, trackedAbilities)

    const secondaryStats = {
        xp,
        hp: (baseStats.vigor + 1 + abilityCounts["Extra Health Points"]) * sizeModifiers[size].hpMultiplier,
        fl: 3 * (baseStats.vigor + abilityCounts["Extra Fatigue Limit"]),
        al: 2 * (baseStats.instinct + abilityCounts["Extra Magic Limit"]),
        mov: Math.ceil((stats.skills.athletics + stats.skillGroups.constitution + baseStats.strength) / 2.0) + sizeModifiers[size].movementModifier,
        dfn: 10 + baseStats.agility + sizeModifiers[size].defenceModifier,
        size: size,
        mod: modifier,
        degree: degree
    }    

    const rows = secondaryStatRows.map(([left, right]) => (
        <tr key={left}>
            <td><b>{left.toUpperCase()}:</b></td>
            <td>{secondaryStats[left]}</td>
            <td><b>{right.toUpperCase()}:</b></td>
            <td>{secondaryStats[right]}</td>
        </tr>
    ));

    rows.push(
        <tr key="size">
        <td><b>Size:</b></td>
        <td>
            <select
            className="size-select"
            value={stats.characterInfo.size}
            onChange={e => setStats("characterInfo", "size", e.target.value as Sizes)}
            >
            {sizeOptions.map(size => (
                <option key={size} value={size}>
                {capitalFirst(size)}
                </option>
            ))}
            </select>
        </td>
        <td><b>Degree:</b></td>
        <td>{capitalFirst(secondaryStats.degree)}</td>
        </tr>
    )

    rows.push(
        <tr key="model">
        <td><b>Model:</b></td>
        <td>{secondaryStats.mod}</td>
        <td><b>Model XP:</b></td>
        <td>{secondaryStats.mod}</td>
        {/* todo: make this an input field with an xp modifier */}
        </tr>
    )

    return(
    <table className="secondary-stat-table">
        <tbody>{rows}</tbody>
    </table>
    )
}