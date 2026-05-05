/**
 * Settings for the actual webpage. Not saved with the character's sheet.
 * @param darkMode If the app should be in dark mode or not
 * @param verboseAbilities If the app should render abilities with descriptions or not
 * @param viewMode If the app is in view or edit mode
 */
export type Settings = {
  darkMode: boolean,
  verboseAbilities: boolean,
  viewMode: boolean,
}

export const defaultSettings: Settings = {
  darkMode: true,
  verboseAbilities: true,
  viewMode: false,
}

export type Degrees = "normal" | "amazing" | "epic" | "divine"

/**
 * Character information that needs to be saved with the sheet but has no function in the After Us rules.
 * @param name The text in the name field
 * @param notes The text in the notes field
 * @param image The Image URL
 */
export type MetaStats = {
  name: string,
  notes: string,
  image: string,
}

export type Sizes = "tiny" | "small" | "medium" | "big" | "huge" | "colossal"

const baseStats = [
  "strength",
  "agility",
  "vigor",
  "reason",
  "instinct"
] as const

export type BaseStatsId = typeof baseStats[number];
export type BaseStats = Record<BaseStatsId, number>;

const skillGroupNames = [
  "constitution",
  "education",
  "survival",
  "awareness",
  "charisma",
] as const

type GroupId = typeof skillGroupNames[number];
type SkillGroups = Record<GroupId, number>;

const skills = [
  "acrobatics",
  "aim",
  "athletics",
  "brawl",
  "endurance",
  "humanSciences",
  "magic",
  "medicine",
  "mechanisms",
  "naturalSciences",
  "animalHandling",
  "crafting",
  "gathering",
  "stealth",
  "tracking",
  "discern",
  "initiative",
  "insight",
  "perception",
  "will",
  "acting",
  "deceiving",
  "diplomacy",
  "intimidate",
  "ruse",
] as const

export type SkillId = typeof skills[number];
export type Skills = Record<SkillId, number>;

/**
 * Stats that are caclulated as a result of Base Stats, Skills, and Abilities. Also houses the Player's Model.
 * This data is NOT stored in a Player JSON file directly, and is instead calcuated by the app.
 */
export type SecondaryStats = {
    size: Sizes,
    healthPoints: number,
    fatigueLimit: number,
    aetherLimit: number,
    defence: number,
    movement: number,
    model: string,
}

/**
 * Stat data that IS stored in a Player JSON file directly along side the Ability list.
 */
export type Stats = {
    baseStats: BaseStats,
    skillGroups: SkillGroups,
    skills: Skills,
    characterInfo: {
      size: Sizes,
      xp: number,
      modifier: string,
      degree: Degrees,
    }
    metaStats: MetaStats
}

export const defaultStats: Stats = {
    baseStats: {
        strength: 1,
        agility: 1,
        instinct: 1,
        reason: 1,
        vigor: 1,
    },
    skillGroups: {
        awareness: 1,
        charisma: 1,
        constitution: 1,
        education: 1,
        survival: 1,
    },
    skills: {
        acrobatics: 1,
        acting: 1,
        aim: 1,
        animalHandling: 1,
        athletics: 1,
        brawl: 1,
        crafting: 1,
        deceiving: 1,
        diplomacy: 1,
        discern: 1,
        endurance: 1,
        gathering: 1,
        humanSciences: 1,
        initiative: 1,
        insight: 1,
        intimidate: 1,
        magic: 1,
        mechanisms: 1,
        medicine: 1,
        naturalSciences: 1,
        perception: 1,
        ruse: 1,
        stealth: 1,
        tracking: 1,
        will: 1,
    },
    characterInfo: {
        size: "medium",
        xp: 0,
        modifier: "n/a",
        degree: "normal"
    },
    metaStats: {
      name: "",
      notes: "",
      image: "/public/placeholder-image.png"
    }
}

export const skillGroups: {
  group: string;
  skills: { id: SkillId; label: string }[];
}[] = [
  {
    group: "constitution",
    skills: [
      { id: "acrobatics", label: "Acrobatics" },
      { id: "aim", label: "Aim" },
      { id: "athletics", label: "Athletics" },
      { id: "brawl", label: "Brawl" },
      { id: "endurance", label: "Endurance" },
    ],
  },
  {
    group: "education",
    skills: [
      { id: "humanSciences", label: "Human sciences" },
      { id: "magic", label: "Magic" },
      { id: "medicine", label: "Medicine" },
      { id: "mechanisms", label: "Mechanisms" },
      { id: "naturalSciences", label: "Natural sciences" },
    ],
  },
  {
    group: "survival",
    skills: [
      { id: "animalHandling", label: "Animal handling" },
      { id: "crafting", label: "Crafting" },
      { id: "gathering", label: "Gathering" },
      { id: "stealth", label: "Stealth" },
      { id: "tracking", label: "Tracking" },
    ],
  },
  {
    group: "awareness",
    skills: [
      { id: "discern", label: "Discern" },
      { id: "initiative", label: "Initiative" },
      { id: "insight", label: "Insight" },
      { id: "perception", label: "Perception" },
      { id: "will", label: "Will" },
    ],
  },
  {
    group: "charisma",
    skills: [
      { id: "acting", label: "Acting" },
      { id: "deceiving", label: "Deceiving" },
      { id: "diplomacy", label: "Diplomacy" },
      { id: "intimidate", label: "Intimidate" },
      { id: "ruse", label: "Ruse" },
    ],
  },
];

export const sizeModifiers = {
    "tiny": {
        hpMultiplier: 1,
        defenceModifier: 5,
        movementModifier: 0,
        xpModifier: -10,
    },
    "small": {
        hpMultiplier: 3,
        defenceModifier: 2,
        movementModifier: 1,
        xpModifier: -5,
    },
    "medium": {
        hpMultiplier: 5,
        defenceModifier: 0,
        movementModifier: 4,
        xpModifier: 0,
    },
    "big": {
        hpMultiplier: 7,
        defenceModifier: -2,
        movementModifier: 6,
        xpModifier: 15,
    },
    "huge": {
        hpMultiplier: 10,
        defenceModifier: -5,
        movementModifier: 12,
        xpModifier: 45,
    },
    "colossal": {
        hpMultiplier: 15,
        defenceModifier: -10,
        movementModifier: 18,
        xpModifier: 90,
    },
}