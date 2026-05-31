import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../app/store";

export const selectAbilities = (
  state: RootState
) => state.currentAbilities.abilities;

export const getCurrentSpells = createSelector(
    [selectAbilities],
    abilities => {
      const spells: string[] = [];

      abilities.forEach(ability => {
        if (ability.spells?.length) {
          spells.push(...ability.spells);
        }
      });

      return spells.length
        ? spells
        : ["no known spells"];
    }
);

export const getDamageAffinities = createSelector(
    [selectAbilities],
    abilities => {
      const affinities = abilities
        .filter(
          ability =>
            ability.name === "Damage Affinity" &&
            ability.dropdownSelection
        )
        .map(
          ability => ability.dropdownSelection!
        );

      return affinities.length
        ? affinities
        : ["no affinities"];
    }
);