import type { RootState, AppDispatch } from "../app/store";
import { setBaseStat, setSkillGroup, setSkill } from "./statsSlice";
import { clamp } from "ramda"
import { type BaseStats, type SkillGroups, type Skills, type Degrees } from "../app/types";


type LevelCaps = Record<Degrees, {basic: number, group: number, skill: number}>

const levelCaps: LevelCaps= {
  normal: {
    basic: 20,
    group: 5,
    skill: 10,
  },
  amazing: {
    basic: 30,
    group: 10,
    skill: 15,
  },
  epic: {
    basic: 40,
    group: 15,
    skill: 15,
  },
  divine: {
    basic: 40,
    group: 15,
    skill: 15,
  }
}

// GPT Generated
export const updateBaseStat = (key: keyof BaseStats, value: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const degree = getState().metaInfo.degree;

    const clamped = clamp(
      0,
      levelCaps[degree].basic,
      value
    );

    dispatch(
      setBaseStat({
        key,
        value: clamped,
      })
    );
  };

export const updateSkillGroup = (key: keyof SkillGroups, value: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const degree = getState().metaInfo.degree;

    const clamped = clamp(
      0,
      levelCaps[degree].group,
      value
    );

    dispatch(
      setSkillGroup({
        key,
        value: clamped,
      })
    );
  };

export const updateSkill = (key: keyof Skills, value: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const degree = getState().metaInfo.degree;

    const clamped = clamp(
      0,
      levelCaps[degree].skill,
      value
    );

    dispatch(
      setSkill({
        key,
        value: clamped,
      })
    );
  };