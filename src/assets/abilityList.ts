import { type SkillId, type BaseStatsId, type Degrees, type Sizes, skillGroupNames, skills } from "../app/types";

export type Categories = "combat" | "magic" | "personal" | "skills" | "flaws"

/** 
 * Defines if this ability has enhancement options, and what mode they use for selection.
 * None - no enhancements. Any - Enhancements can be collected in any order. Stacking - Enhancements must be collected sequentially.
 */
export type EnhancementModes = "none" | "any" | "stacking"

/** Generic dropdown that can be added to ability selection:
* Dropdown for Affinity selection
* Dropdown of all current Affinities
* Dropdown of current spells
* Dropdown for Skill selection
*/
export const DROPDOWNS = {
    attackType: ["melee", "ranged"],
    damageResistance: [
        "biologic",
        "chemical",
        "cold",
        "electric",
        "fire",
        "necrotic",
        "posion",
        "slash",
        "smash",
        "sonic",
    ],
    damageType: [
        "biologic",
        "chemical",
        "cold",
        "electric",
        "fire",
        "necrotic",
        "posion",
        "slash",
        "smash",
        "sonic",
        "aetherburn",
        "psychic",
    ],
    maneuver: ["break", "disarm", "knock down", "push", "trample"],
    arena: ["water", "forest", "plains", "desert", "ice", "mountain", "sky", "city", "underground"],
    performanceArt: ["instrument", "acting", "singing"],
    vehicle: ["light air", "heavy air", "light land", "heavy land", "light water", "heavy water"],
    gathering: ["collecting", "extracting"],
    skillGroups: skillGroupNames,
    skills,
}


/**
 * Defines if this ability has a dropdown with specific settings.
 */
export type DropdownModes = keyof typeof DROPDOWNS | "none" | "currentSpells" | "currentDamageAffinities"


export type Prereq = {
  base?: Partial<Record<BaseStatsId, number>>;
  skill?: Partial<Record<SkillId, number>>;
  abilities?: string[];
  smallerThan?: Sizes;
  largerThan?: Sizes;
};

export type AbilityEnhancement = {
    cost: number,
    description: string,
    degree?: Degrees,
}

export type Ability = {
    name: string, // The ability's name
    cost: number, // The XP cost of the ability. Negative for flaws.
    description: string, // The Ability's description text. Might not be the full desc, but enough to understand what it does.
    degree?: Degrees, // The ability's power degree. Defaults to Normal
    spells?: string[], // An array of the names of spells granted by this ability, if any.
    prereq?: Prereq // An object containing all requirements needed in order to have this ability.
    stackable?: Boolean // If true, this ability can be aquired more than once on one sheet. Defaults to False.
    exclusive?: String // The name of another ability. If given as a param, this ability cannot be added to a sheet that already has that ability.
    enhancementMode?: EnhancementModes // If this ability has enhancement options, this value must be 'any' or 'stacking'
    enhancements?: AbilityEnhancement[] // If this ability has enhancements, they are defined as an array here.
    dropdownMode?: DropdownModes // If this ability uses a dropdown, this is the type of dropdown
}

export interface RenderedAbility extends Ability{
    id: string,
    flaw: boolean,
    appliedEnhancementsList?: boolean[]
    dropdownSelection?: string // The selection from the dropdown, if present
}

function getSortedAbilities(
  abilitiesByCategory: { [key in Categories]: Ability[] }
): { [key in Categories]: Ability[] } {
  const sorted: Partial<{ [key in Categories]: Ability[] }> = {};

  for (const category in abilitiesByCategory) {
    sorted[category as Categories] = [...abilitiesByCategory[category as Categories]]
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted as { [key in Categories]: Ability[] };
}

const unsortedAbilities: { [key in Categories]: Ability[] } = {
    combat: [
        {
            name: "Armor Adeptness",
            cost: 20,
            prereq: {
                base: {
                    strength: 6,
                }
            },
            description: "Reduces the penalties when using armor. Light armor causes no disadvantage and heavy armor causes only disadvantage when worn.",
        },
        {
            name: "Armor Virtuoso",
            cost: 20,
            prereq: {
                base: {
                    strength: 11,
                },
                abilities: ["Armor Adeptness"]
            },
            description: "Further reduces penalties when using armor. Heavy armor causes no disadvantage when worn.",
        },
        {
            name: "Armor of Skill",
            cost: 10,
            description: "Add your group bonus of the chosen skill group to your DFN when you aren't using armor.",
            dropdownMode: "skillGroups",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 10,
                    description: "You can add this group bonus to your DFN as long as you aren't using heavy armor."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You can always add this group bonus to your DFN"
                }
            ]
        },
        {
            name: "Acuity with Weapon",
            // Todo: Add Enhancements
            cost: 10,
            description: "When attacking with light melee weapons, you can use your AGI instead of STR to calculate your Brawl skill and the damage of the attacks.",
        },
        {
            name: "Charged Attack",
            cost: 10,
            stackable: true,
            dropdownMode: "attackType",
            description: "Takes a complete action and 1 FP. Your next attack does +100% damage if it lands. This ability can't be combined with any ability that allows multiple attacks",
        },
        {
            name: "Combat Reflexes",
            cost: 10,
            description: "When an opponent in melee range is off-gaurd, you can do any melee attack as a reaction.",
        },
        {
            name: "Improved Maneuver",
            cost: 5,
            stackable: true,
            dropdownMode: "maneuver",
            description: "Choose a maneuver type. You receive advantage when preforming or defending against the chosen maneuver. You can aquire this once for each maneuver",
        },
        {
            name: "Reckless",
            cost: 10,
            description: "You may choose to use the Reckless ability before making any moves for your turn. When Reckless is active, you receive advantage on all melee and ranged attack checks this turn, but in return all attack rolls against you also have advantage until the start of your next turn.",
        },
        {
            name: "Sneak Attack",
            cost: 10,
            prereq: {
                skill: {
                    stealth: 2,
                }
            },
            description: "Once per turn, when attacking one creature with advantage from a stealth check, you may add an extra 1d6 damage. The attack must use a finesse or ranged weapon.",
        },
        {
            name: "Vital Energy",
            degree: "amazing",
            cost: 20,
            prereq: {
                base: {
                    vigor: 6
                }
            },
            exclusive: "Blood Price",
            description: "You can choose to suffer damage instead of accumulating FP. For this purpose, each 2 HP you lose is equivalent to 1 FP. This ability cannot be combined with effects that recover HP, nor can it be applied when the FP is received passively.",
        },
        {
            name: "Damage Affinity",
            cost: 10,
            stackable: true,
            dropdownMode: "damageType",
            description: "Choose a damage type that you don't have affinity with. You receive affinity with it. You can aquire this once for each damage type.",
        },
        {
            name: "Damage Resistance",
            cost: 10,
            stackable: true,
            dropdownMode: "damageResistance",
            description: "You receive advantage against a damage type other than aetherburn or psychic, at your choice.",
        },
        {
            name: "Mighty Wield",
            cost: 10,
            prereq: {
                base: {
                    strength: 8
                }
            },
            description: "You receive disadvantage instead of major disadvantage when using extreme weapons.",
        },
        {
            name: "Amazing Wield",
            cost: 10,
            degree: "amazing",
            prereq: {
                base: {
                    strength: 15
                },
                abilities: ["Mighty Wield"]
            },
            description: "You don't receive disadvantage when using extreme weapons.",
        },
        {
            name: "Bite",
            cost: 5,
            description: "Using your powerful teeth and jaws you can make a 1d6 unarmed strike for slashing damage. This can be done while both of your hands are holding objects. This does not benefit from extended reach or heavy hands.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "This attack does 2d6 damage instead"
                }
            ]
        },
        {
            name: "Brawler",
            cost: 10,
            description: "You can perform an additional unarmed melee attack when performing melee attacks. Doing this causes every attack to receive disadvantage. You must declare you're using this ability before rolling any attack.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You don't receive disadvantage from this ability"
                }
            ]
        },
        {
            name: "Extra Energy",
            cost: 10,
            description: "With a standard action, you can recover an amount of HP equal to two times your VIG. You can only use this ability when your HP is critical. Using this ability yields 2 FP. this ability does not benefit from the ability Vital Energy.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can activate this ability when at any amount of HP."
                }
            ]
        },
        {
            name: "Harming Touch",
            cost: 10,
            description: "Choose a damage type you have affinity with. Using a major action, you can unleash an attack against all the characters in your melee range. Using this ability yields 1 FP. This ability doesn't differentiate friends or foes. You can acquire this ability once for each damage type.",
            stackable: true,
            dropdownMode: "currentDamageAffinities",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    description: "You can activate this ability as a reaction to being hit with a melee attack. This reaction only targets the character attacking you."
                }
            ]
        },
        {
            name: "Weapon Focus",
            cost: 10,
            description: "Choose a damage type you have affinity with. When performing attacks with this damage type, you receive +2 to your attack test. This ability can be aquired once for each damage type",
            stackable: true,
            dropdownMode: "currentDamageAffinities",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "You also cause +2 damage with attacks of this damage type."
                }
            ]
        },
        {
            name: "Projectile",
            cost: 10,
            description: "Choose a damage type you have affinity to. You gain a natural ranged weapon that does 1d6 damage in the type chosen. You can aquire this once for each damage type.",
            stackable: true,
            dropdownMode: "currentDamageAffinities",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "Increase the damage type of this natural ranged weapon by 1d6."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "Increase the damage by another 1d6."
                },
                {
                    cost: 30,
                    degree: "amazing",
                    description: "Increase the damage by another 1d6."
                },
                {
                    cost: 40,
                    degree: "epic",
                    description: "Increase the damage by another 1d6."
                },
                {
                    cost: 50,
                    degree: "epic",
                    description: "Increase the damage by another 1d6."
                },
            ]
        },
        {
            name: "Damage Invulnerability",
            cost: 50,
            degree: "amazing",
            description: "Choose a damage type. You receive +10 on your defense against that damage, and receive advantage on every test to avoid it. You can acquire this ability once for each damage type.",
            stackable: true,
            dropdownMode: "damageType",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 50,
                    degree: "epic",
                    description: "This invulnerability is enhanced, yielding +20 to your defense and major advantage on every test to avoid it."
                },
                {
                    cost: 50,
                    degree: "divine",
                    description: "This invulnerability is further enhanced, yielding +30 to your defense and total advantage on every test to avoid it."
                }
            ]
        },
        {
            name: "Mighty Strike",
            cost: 10,
            degree: "normal",
            description: "When performing a melee attack, you can choose to receive disadvantage on the attack test in exchange of adding 1d6 to the damage, if the attack lands.",
            stackable: true,
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You can choose to receive major disadvantage on the attack test to receive +3d to the damage."
                },
                {
                    cost: 10,
                    degree: "epic",
                    description: "You can choose to receive total disadvantage on the attack test to receive +5d to the damage."
                }
            ]
        },
        {
            name: "Leverage",
            cost: 20,
            description: "When using any melee weapon besides light ones with both hands, you add two times your STR to the damage. If you are benefiting from Acuity with Weapon, this ability has no effects.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "When benefiting from Acuity with Weapon, you sum both your STR and AGI to the damage (one time each)"
                }
            ]
        },
        {
            name: "Deflection",
            cost: 10,
            prereq: {
                skill: {
                    brawl: 3
                }
            },
            description: "As a reaction, you can avoid a ranged attack that would pass your defense if you make a Brawl check higher than the attack. Costs 1 FP and counts as a dodge",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "When sucessfuly deflecting an attack you can choose to redirect the attack to a new target with an Aim check. Adds +1 FP"
                }
            ]
        },
        {
            name: "Parry",
            cost: 10,
            prereq: {
                skill: {
                    brawl: 3
                }
            },
            description: "As a reaction, you can avoid a melee attack that would pass your defense if you make a Brawl check higher than the attack. Costs 1 FP and counts as a dodge",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 20,
                    description: "When sucessfuly deflecting an attack you can preform a basic melee attack as a counter-attack. Adds 1FP in addition to the parry."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can use any melee attack as a counter-attack instead of a basic melee attack, as long as it would normally use a single standard action and it is a single attack."
                }
            ]
        },
        {
            name: "Enhanced Strikes",
            cost: 10,
            description: "Using a minor action you can increase the damage of your melee attack by 1d6 for the rest of your turn. This ability costs 1 FP",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "When using this ability, you can change the damage type for your attacks to a damage type to one you have affinity with."
                },
                {
                    cost: 10,
                    description: "This ability also works with ranged attacks."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "Choose a damage type that you have affinity for. When using this ability, you can add the chosen damage type to your attacks, making them cause both damage types at the same time."
                }
            ]
        },
        {
            name: "Multi-Strike",
            cost: 20,
            prereq: {
                base: {
                    agility: 5
                }
            },
            stackable: true,
            dropdownMode: "attackType",
            description: "Each turn you can peform a number of additional attacks equal to your AGL divided by 5 (round down). Each additional attack gives +1 FP and has disadvantage.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You don't recieve disadvantage on attacks given by this ability"
                },
                {
                    cost: 20,
                    degree: "epic",
                    description: "You can perfom any number of addtional attacks for 3 FP."
                }
            ]
        },
        {
            name: "Stun",
            cost: 10,
            description: "You can perform an attack that instead of dealing damage stuns the target instead. The target must succeed on Endurance against your DC 10 + Aim or Brawl (the one used for the attack) or they become stunned. Costs 1 FP",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "You can increase the DC of the stun test by 1 for every extra 1 FP you choose to add. This can't be used with the Paralize enhancement"
                },
                {
                    cost: 20,
                    description: "Instead of stunning, you can fully paralyze the target. The DC changes to be 5 + Aim or Brawl."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You can increase the DC of the paralyze test by 1 for every extra 1 FP you choose to add."
                },
            ]
        },
    ],
    magic: [
        {
            name: "Mantia",
            cost: 10,
            prereq: {
                base: {
                    instinct: 3,
                    reason: 3
                }
            },
            description: "You are able to cast compositions. You also learn the basic compositions Heal, Move, Strke, and Cover",
            spells: ["heal", "move", "strike", "cover"]
        },
        {
            name: "Aethermantia",
            cost: 15,
            prereq: {
                base: {
                    instinct: 4,
                },
                skill: {
                    magic: 4,
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls the flow and movement of aether itself. You learn the compositions Purify, Check, Empower, and Assist",
            spells: ["purify", "check", "empower", "assist"]
        },
        {
            name: "Iasimantia",
            cost: 20,
            prereq: {
                skill: {
                    medicine: 2,
                },
                abilities: ["Mantia"]
            },
            description: "Magic focused on healing and restoration. You learn the compositions Aid, Cure, and Restore",
            spells: ["aid", "cure", "restore"]
        },
        {
            name: "Biomantia",
            cost: 20,
            degree: "amazing",
            prereq: {
                skill: {
                    magic: 5,
                    medicine: 4,
                },
                abilities: ["Iasimantia"]
            },
            description: "Advanced magic that controls biological energy. You learn the compositions Regenerate and Weaken",
            spells: ["regenerate", "weaken"]
        },
        {
            name: "Filasomantia",
            cost: 20,
            prereq: {
                abilities: ["Mantia"]
            },
            description: "Magic focused on defense and reflections. You learn the compositions Shield, Reinforce, and Wall",
            spells: ["shield", "reinforce", "wall"],
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can cast these compositions to the Amazing degree"
                }
            ]
        },
        {
            name: "Polemosmantia",
            cost: 20,
            prereq: {
                abilities: ["Mantia"]
            },
            description: "Magic that controls how to shape energy. You learn the compositions Ball of Energy, Burst, Damage, Fan, and Line",
            spells: ["ball of energy", "burst", "damage", "fan", "line"],
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can cast these compositions to the Amazing degree"
                }
            ]
        },
        {
            name: "Kinesismantia",
            cost: 20,
            prereq: {
                abilities: ["Mantia"]
            },
            description: "Magic that controls movement and force. You learn the compositions Force, Lift, Control, and Speed",
            spells: ["force", "lift", "control", "speed"]
        },
        {
            name: "Pyromantia",
            cost: 20,
            prereq: {
                skill: {
                    magic: 2
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls heat and fire. You learn the compositions Wick, Ball of Fire, and Burst (fire)",
            spells: ["wick", "ball of energy", "burst"]
        },
        {
            name: "Cryomantia",
            cost: 10,
            prereq: {
                skill: {
                    magic: 2
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls cold, ice, and snow. You learn the compositions Cool, Ball of Frost, and Fan (cold)",
            spells: ["cool", "ball of energy", "fan"]
        },
        {
            name: "Oxymantia",
            cost: 15,
            prereq: {
                skill: {
                    magic: 4
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls chemicals like acids. You learn the compositions Ball of Acid, and Fan (acid)",
            spells: ["ball of energy", "fan"]
        },
        {
            name: "Fulgurmantia",
            cost: 15,
            prereq: {
                skill: {
                    magic: 3
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls electricity and lightning. You learn the compositions Empower (electric), Ball of Lightning, and Line (electric)",
            spells: ["empower", "ball of energy", "line"]
        },
        {
            name: "Aeromantia",
            cost: 15,
            prereq: {
                skill: {
                    magic: 2
                },
                abilities: ["Mantia"]
            },
            description: "Magic that controls air and wind. You learn the compositions Gust, Push-back and Lift (air)",
            spells: ["gust", "push", "lift"]
        },
        {
            name: "Illumantia",
            cost: 20,
            prereq: {
                skill: {
                    magic: 2
                },
                abilities: ["Mantia"]
            },
            description: "Magic that allows the emission of light. You learn the compositions Illuminate and Flash",
            spells: ["illuminate", "flash"]
        },
        {
            name: "Zoomantia",
            cost: 20,
            prereq: {
                skill: {
                    magic: 3,
                    animalHandling: 2,
                },
                abilities: ["Mantia"]
            },
            description: "Magic that taps into the energy of nature. You learn the compositions Wild Shape and Summon Creature",
            spells: ["wild shape", "summon creature"],
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can cast these compositions to the Amazing degree"
                },
                {
                    cost: 15,
                    degree: "epic",
                    description: "You can cast these compositions to the Epic degree"
                },
                {
                    cost: 15,
                    degree: "divine",
                    description: "You can cast these compositions to the Divine degree"
                }
            ]
        },
        {
            name: "Aggumantia",
            cost: 30,
            degree: "amazing",
            prereq: {
                skill: {
                    magic: 4,
                },
                abilities: ["Mantia"]
            },
            description: "Advanced magic that allows combining lifeforms. You learn the composition Fusion",
            spells: ["fusion"],
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "epic",
                    description: "You can cast Fusion to the Epic degree"
                }
            ]
        },
        {
            name: "Pathemantia",
            cost: 20,
            prereq: {
                skill: {
                    magic: 2,
                    medicine: 2,
                },
                abilities: ["Mantia"]
            },
            description: "Magic that deals with telepathy. You learn the compositions Read Thoughts and Detect Thoughts",
            spells: ["read thoughts", "detect thoughts"],
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You can cast these compositions to the Amazing degree"
                }
            ]
        },
    ],
    personal: [
        {
            name: "Acceleration",
            cost: 10,
            description: "You can make another movement action for 1 FP.",
        },
        {
            name: "Alternate Form",
            cost: 20,
            stackable: true,
            description: "You have another form! You are free to build this form as long as it has the same XP, REA, INS, reason and instinct related skills, and reason and instinct related abilities and flaws. Changing forms consume a whole round."
        },
        {
            name: "Good Reputation",
            cost: 10,
            stackable: true,
            description: "You have a good reputation with a certain kind of people. When interacting with them, you receive advantage on your Charisma tests.",
        },
        {
            name: "False Appearance",
            cost: 15,
            description: "As a major action, you can transform yourself to camouflage with specific surroundings, such as a skeleton hiding as a pile of bones. This is ultimately up to the GM and the player. When in the false appearance state, you are considered prone and have a movement of 0, but are indistinguishable from your counterpart.",
        },
        {
            name: "Shaman",
            cost: 10,
            degree: "amazing",
            description: "You can interact with incorporeal beings as if they were corporeal.",
        },
        {
            name: "Command",
            cost: 10,
            description: "You can shout orders to your allies in the range of your voice. Doing this consumes a minor action, yields 1 FP, and gives a bonus of +2 to every ally on every test for the rest of the scene.",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 15,
                    description: "Change the bonus to +3."
                },
                {
                    cost: 20,
                    description: "Change the bonus to +4."
                }
            ]
        },
        {
            name: "Disease Resistance",
            cost: 10,
            description: "You receive advantage on Endurance tests to resist diseases and to recover from them.",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 15,
                    description: "Increase the bonus to major advantage."
                },
                {
                    cost: 20,
                    description: "Increase the bonus to total advantage."
                },
                {
                    cost: 25,
                    degree: "amazing",
                    description: "You become immune to mundane diseases."
                },
                {
                    cost: 30,
                    degree: "epic",
                    description: "You become immune to magical diseases."
                }
            ]
        },
        {
            name: "Poison Resistance",
            cost: 10,
            description: "You receive advantage on tests of Endurance to resist poisons. Any damage caused by poisons to you is reduced by 5.",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 15,
                    description: "Increase the bonus to major advantage. The damage reduction becomes 10"
                },
                {
                    cost: 20,
                    description: "Increase the bonus to total advantage. The damage reduction becomes 15"
                },
                {
                    cost: 25,
                    degree: "amazing",
                    description: "You become immune to mundane poisons."
                },
                {
                    cost: 30,
                    degree: "epic",
                    description: "You become immune to magical poisons."
                }
            ]
        },
        {
            name: "Imitate",
            cost: 20,
            degree: "amazing",
            description: "You can imitate an ability from a target. If possible, the target must have used this ability before you can test for imitating it. To do so, you must use one combat turn and be well succeeded in a test of Perception with DC equal to the target's defense. If well succeeded, you copy the ability for a scene. You can imitate a maximum number of abilites equal to your original REA score.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    description: "You can copy skills from a target. You must see the target use the skill once before you can do a perception check on the skill. The FP is equal to the target's skill bonus"
                },
                {
                    cost: 20,
                    description: "You can imitate a target's stats. Physical stats are imitated the same way as skills, where Mental stats require you to see the use of a mental ability. The FP is equal to the stat's value."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You can copy flaws from a target."
                },
                {
                    cost: 50,
                    degree: "epic",
                    description: "You can imitate a target as a whole. You must have studied the target for a whole week. Using this yeilds FP equal to the target's highest stat"
                }
            ]
        },
        {
            name: "Flight",
            cost: 10,
            degree: "amazing",
            description: "You gain a new way of movement by flight. Your movement value of flight is equal to your Athletics value. Flying yields 1 FP per round. You need freedom of movement to fly.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "Flying yields 1 FP per scene where you use it instead of per round."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You don't need to spend a movement action to stay still on the air."
                }
            ]
        },
        {
            name: "Extended Reach",
            cost: 10,
            description: "Your melee range is extended. All weapons (and unarmed) are treated as if they have another layer of Reach on them.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    degree: "amazing",
                    description: "Add one more layer of Reach"
                }
            ]
        },
        {
            name: "Fusion",
            cost: 30,
            degree: "amazing",
            description: "Using a complete action, you can fuse with a willing character. The fusion has the highest stats between characters that make up the fusion, as well as all abilities and flaws from both. The fusion lasts for the number of rounds equal to your VIG (before the fusion).",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "amazing",
                    description: "The fusion will come with no FP or AP."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "The fusion will last for the whole scene."
                },
                {
                    cost: 20,
                    degree: "epic",
                    description: "You can fuse with an unwilling character if you are grappling them and beat them in an Endurance check."
                },
            ]
        },
        {
            name: "Harmless Appearance",
            cost: 10,
            description: "Against targets that don't know you, you receive advantage on tests of Deceive and Initiative. This doesn't affect characters with the flaw Simple Mind.",
            stackable: true,
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "When in combat, as long as you don't perfom any action that causes harm to another character, you can avoid being attacked as long as your opponent fails a Discern test against your Deception."
                },
                {
                    cost: 10,
                    description: "This ability works on characters with the flaw Simple Mind"
                }
            ]
        },
        {
            name: "Hidden Power",
            cost: 10,
            description: "You can concentrate energy to release more power. In combat you can concentrate to increase your basic stats, where you are considered off gaurd. For every round concentrating, you take 1 FP and your stat goes up by 1.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "When increasing your VIG, your HP will increase as well."
                },
                {
                    cost: 10,
                    description: "When increasing your INS, your HP will increase as well."
                },
                {
                    cost: 10,
                    description: "When increasing your INS, your HP will increase as well."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can concentrate faster, receiving 2 FP per round and +2 to each Skill"
                }
            ]
        },
        {
            name: "Invisibility",
            cost: 20,
            degree: "amazing",
            description: "Using a minor action, you become invisible. Every character has major disavantage on attacks against you and you recieve major advantage on Stealth tests. Staying invisible yields 1 FP per round.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 15,
                    degree: "amazing",
                    description: "Your invisibility doesn't fade upon performing aggressive actions."
                },
                {
                    cost: 15,
                    degree: "amazing",
                    description: "Your invisibility doesn't fade upon receiving damage."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "Your invisibility doesn't fade upon becoming defeated."
                }
            ]
        },
        {
            name: "Possession",
            cost: 20,
            degree: "amazing",
            description: "Using a major action you can enter the body of an unconscious or defeated target while grappling them. You can assume the target's body, gaining all physical stats and abilities from them.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 20,
                    degree: "epic",
                    description: "You can possess conscious and undefeated targets. The target gets advantage on its tests to resist the possession and expel you. All other aspects are the same."
                },
            ]
        },
        // Special Senses group
        {
            name: "Improved Flair",
            cost: 5,
            description: "your sense of smell is much more precise, giving you advantage on Perception tests and other tests related to it.",
        },
        {
            name: "Flair for Emotions",
            cost: 5,
            prereq: {
                abilities: ["Improved Flair"]
            },
            description: "You can smell the hormones of your target, giving you +2 on Discern tests.",
        },
        {
            name: "Improved Hearing",
            cost: 5,
            description: "you can hear much deeper or treble sounds with your hearing, giving you advantage on Perception tests and on other tests related to it.",
        },
        {
            name: "Improved Vision",
            cost: 5,
            description: "you can see farther things and smaller things with your sight, giving you advantage on Perception tests and on other tests related to it.",
        },
        {
            name: "Infravision",
            cost: 10,
            description: "you can see temperatures, making you able to see invisible enemies and in the dark as long as there are differences in temperatures.",
        },
        {
            name: "Night Vision",
            cost: 5,
            description: "You can see in near complete darkness",
        },
        {
            name: "Radar",
            cost: 5,
            prereq: {
                abilities: ["Improved Hearing"]
            },
            description: "you can use your hearing to tell the distance to things, being able to navigate without your sight.",
        },
        {
            name: "X-Ray Vision",
            cost: 10,
            description: "you can see through things, except those with huge density.",
        },
        // These abilties modify the Secondary Stat output
        {
            name: "Extra Fatigue Limit",
            cost: 10,
            description: "Your VIG is considered one point higher when calculating your FL",
        },
        {
            name: "Extra Health Points",
            cost: 10,
            description: "Your VIG is considered one point higher when calculating your HP",
        },
        {
            name: "Extra Magic Limit",
            cost: 10,
            description: "Your INS is considered one point higher when calculating your AL",
        },

    ],
    skills: [
        {
            name: "Nimble",
            cost: 10,
            prereq: {
                smallerThan: "big",
            },
            description: "You can use your AGI instead of STR on your Athletics skill.",
        },
        {
            name: "Arena",
            cost: 20,
            prereq: {
                skill: {
                    tracking: 2,
                    gathering: 2,
                }
            },
            stackable: true,
            dropdownMode: "arena",
            description: "Choose a terrain type. When on this terrain, you get a bonus of +2 to all Actobatics, Athletics, Perception, Survival, and Tracking tests.",
        },
        {
            name: "Artist",
            cost: 10,
            prereq: {
                skill: {
                    acting: 2
                }
            },
            stackable: true,
            dropdownMode: "performanceArt",
            description: "Choose a performance art. You receive advantage on Acting tests involving it.",
        },
        {
            name: "Bold Acrobat",
            cost: 20,
            prereq: {
                skill: {
                    acrobatics: 3
                }
            },
            description: "You don't suffer movement reduction on rough terrain.",
        },
        {
            name: "Calm Flow",
            cost: 20,
            prereq: {
                skill: {
                    insight: 5
                }
            },
            description: "Choose a performance art. You receive advantage on Acting tests involving it.",
        },
        {
            name: "Skeptic",
            cost: 10,
            description: "When you fail in a test of Discern against Deceive performed by another character, you receive advantage on the next test of the same type against this character.",
        },
        {
            name: "Diligent",
            cost: 20,
            description: "You can spend a major action studying a certain task. You receive a bonus of +2 on the test for this task as long as it's performed before the end of the next round.",
        },
        {
            name: "Empathy",
            cost: 10,
            description: "You receive advantage on Discern tests of Sense Behavior.",
        },
        {
            name: "Face in the Crowd",
            cost: 10,
            description: "You receive advantage on tests of Stealth when in the middle of crowds.",
        },
        {
            name: "Merchant",
            cost: 10,
            description: "You receive advantage on tests to Bargain, and change the price by 10% with each success.",
        },
        {
            name: "Investigator",
            cost: 10,
            prereq: {
                skill: {
                    tracking: 2,
                }
            },
            description: "You receive advantage on Tracking tests of following tracks, and can move with your normal movement while doing it."
        },
        {
            name: "Watchful",
            cost: 10,
            prereq: {
                base: {
                    instinct: 5
                }
            },
            description: "You can use an Active Perecption check whenever you would use an Passive Perception check.",
        },
        {
            name: "Mingy Crafter",
            cost: 10,
            prereq: {
                skill: {
                    crafting: 2
                }
            },
            description: "The amount of resources needed to make items changes to 1/4 of the total price of the item instead of 1/3 for you.",
        },
        {
            name: "Tolerance",
            cost: 10,
            prereq: {
                skill: {
                    endurance: 2
                }
            },
            description: "Reduces the penalties from climate on tests of Endurance. Total disavantage becomes major disadvantage, ect. You can also sleep while wearing armor.",
        },
        {
            name: "Violent Behavior",
            cost: 10,
            prereq: {
                base: {
                    strength: 6
                }
            },
            description: "You can use STR instead of REA when calculating your Intimidate skill bonus.",
        },
        {
            name: "Catwalk",
            cost: 20,
            prereq: {
                base: {
                    agility: 5
                },
                skill: {
                    acrobatics: 3
                }
            },
            description: "you receive advantage on tests of Acrobatics for balance and secure fall. You also produce less sound when walking, receiving advantage on Stealth tests against targets listening for you.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "You are less likely to trigger traps or mechanisms that activate through pressure plates. When passing though one, roll 1d. With a result 1 or 2, the pressure plate is triggered."
                },
                {
                    cost: 10,
                    degree: "amazing",
                    description: "You always suffer minimum fall damage, as if all the dice rolled 1 during the damage calculation."
                }
            ]
        },
        {
            name: "Expert Pilot",
            cost: 5,
            prereq: {
                skill: {
                    mechanisms: 2
                }
            },
            stackable: true,
            dropdownMode: "vehicle",
            description: "You receive advantage on Mechanisms tests of drive and operate when using the selected vehicle type.",
        },
        {
            name: "Fearsome",
            cost: 10,
            prereq: {
                skill: {
                    intimidate: 2
                }
            },
            description: "Using a Major action, you can perform a test of Intimidate against a target on the range of your voice. If the target fails, it'll become frightened. Doing this yields 1 FP.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "This only uses a minor action instead of a major action."
                },
            ]
        },
        {
            name: "Makeshift Crafting",
            cost: 10,
            prereq: {
                skill: {
                    crafting: 2
                }
            },
            description: "You can perform makeshift repairs to items. Roll a repair test. Instead of consuming a complete action, this test consumes a major action, and does not consume any resources. The repairs work for a scene, after which it is reverted.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "You can use this ability with complex items, such as the ones related to the Mechanisms skill."
                },
            ]
        },
        {
            name: "Overstocker",
            cost: 10,
            prereq: {
                skill: {
                    gathering: 2
                }
            },
            stackable: true,
            dropdownMode: "gathering",
            description: "When performing the selected task, you receive advantage and collect twice as much resources.",
        },
        {
            name: "Pickpocket",
            cost: 10,
            prereq: {
                skill: {
                    stealth: 3
                }
            },
            description: "Using a Major action, you can take items from other people without being noticed. Roll a test of Stealth (DC 20; light). If successful, you take an item that isn't equipped by the target. Items that are too big cause disadvantage. The target can perform a test of Perception with DC equal to the result of your Stealth test. If succeeded, the target notices something was stolen.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "Pickpocket requires a minor action instead of a major action."
                },
                {
                    cost: 10,
                    description: "Pickpocket is reduced to effortless, which means it takes 0 FP."
                },
                {
                    cost: 20,
                    description: "Requires both previous enhancements. Once per round you can Pickpocket for 1FP as a bonus action."
                },
                {
                    cost: 20,
                    degree: "amazing",
                    description: "You can steal equipped weapons as a maneuver test. Roll for Stealth against the target's brawl, if you succeed you steal the weapon."
                },
                {
                    cost: 30,
                    degree: "amazing",
                    description: "Requires previous. You can steal any equipped item, but receive disavantage on the test."
                }
            ]
        },
        {
            name: "Identify Person",
            cost: 10,
            description: "Using a Major action, you can use your ruse skill to get information on the stats, skills, abilities and flaws of a target. The DC is equal to 10 plus the target's power divided by 100. Each test gives one peice of information (stat values, skill group values, mental or physical abilites, ect. If the target has good or bad reputation, you get advantage.",
            enhancementMode: "any",
            enhancements: [
                {
                    cost: 10,
                    description: "If the target has good or bad reputation, you get total advantage on the ruse test."
                },
                {
                    cost: 10,
                    description: "The DC of the ruse test is halved."
                },
            ]
        },
        {
            name: "Polyglot",
            cost: 10,
            description: "You receive advantage on Human Sciences test of language.",
            enhancementMode: "stacking",
            enhancements: [
                {
                    cost: 10,
                    description: "You receive major advantage instead of advantage.",
                },
                {
                    cost: 10,
                    description: "You receive total advantage instead of major advantage.",
                },
            ]
        },
        // Special Movements
        {
            name: "Wall Crawl",
            cost: 10,
            description: "Different from the normal climb movement from the Athletics skill, you can move at your normal speed on vertical surfaces or even on the ceiling. You only make tests of Athletics to avoid falling from damage.",
        },
        {
            name: "Dig",
            cost: 10,
            description: "you can move through soft soils with half of your normal movement. You can choose if you want to leave an open tunnel behind you or collapse it.",
        },
        {
            name: "Adept Swimmer",
            cost: 10,
            description: "Water is no longer considered rough terrain, meaning you can use your full movement in water.",
        },
        {
            name: "Water Walk",
            cost: 10,
            description: "you can walk over water and any other liquid material as if you were walking on solid ground. You can still dive into the liquid normally. This ability doesn't give any protection against the effects of the liquids you may walk over (eg. you will still burn if walking over lava).",
        },
        {
            name: "Glide",
            cost: 10,
            description: "As long as you have freedom of movement, you can glide safely from any height. This grants advantage on tests of secure fall and immunity to fall damage when successfully gliding.",
        },
        // GPT Generated ones
        {
            name: "Eavesdropper",
            cost: 10,
            prereq: {
                skill: {
                    ruse: 1
                }
            },
            description: "You consume only 1d6 hours to use the Ruse skill, and don't need to spend money on doing so.",
        },
        {
            name: "Emergency Doctor",
            cost: 10,
            prereq: {
                skill: {
                    medicine: 3
                }
            },
            description: "You receive advantage on Medicine tests of first aid and prevent death.",
        },
        {
            name: "Fast Talk",
            cost: 10,
            prereq: {
                skill: {
                    deceiving: 2
                }
            },
            description: "You gain advantage on tests of Deception against unaware or off-guard targets.",
        },
        {
            name: "Green Stamp",
            cost: 10,
            prereq: {
                skill: {
                    crafting: 2
                }
            },
            description: "When recycling an item, you recover 1/5 of its price in resources instead of 1/6.",
        },
        {
            name: "Hacker",
            cost: 10,
            prereq: {
                skill: {
                    mechanisms: 2
                }
            },
            description: "You gain advantage on Mechanisms tests of computation.",
        },
        {
            name: "Inner Peace",
            cost: 10,
            prereq: {
                skill: {
                    insight: 2
                }
            },
            description: "Meditation removes twice the FP and AP, and only requires 30 minutes instead of 1 hour.",
        },
        {
            name: "Interrogatory",
            cost: 20,
            prereq: {
                skill: {
                    intimidate: 3
                }
            },
            description: "You can use Intimidate tests (persuade or threaten) to cause disadvantage on the next test of Deceive for your target. Using this ability yields 1 FP.",
        },
    ],
    flaws: [
        {
            name: "Addiction",
            cost: -10,
            stackable: true,
            description: "You have an addiction of some sort. No matter what it is, if you don't practice it at least once per day, you receive disadvantage on every test.",
        },
        {
            name: "Ambient Dependence",
            cost: -10,
            stackable: true,
            dropdownMode: "arena",
            description: "Choose a terrain type as your ambient. If you pass one day away from this ambient, you receive disadvantage on every test. To recover, you need to stay on your chosen ambient for at least one day and rest once inside of it.",
        },
        {
            name: "Bad Appearance",
            cost: -5,
            stackable: true,
            description: "Something about your appearance makes you less interesting to people. Choose a stat to which your bad appearance will be connected. You receive -2 to your Charisma tests relating to that stat.",
            exclusive: "Attractive"
        },
        {
            name: "Bad Reputation",
            cost: -5,
            stackable: true,
            description: "You have a bad reputation with a certain kind of people. When interacting with them, you receive disadvantage on your Charisma tests.",
        },
        {
            name: "Blood Price",
            cost: -10,
            exclusive: "Vital Energy",
            description: "Any time you perform an action that yields FP or AP, you take 2 points of damage to your health. Nothing can reduce or cancel this damage. You can recover normally.",
        },
        {
            name: "Channeling",
            cost: -10,
            description: "You have a certain item that helps you focus on your tasks. Whenever you are without this item, you receive twice as much FP and AP for anything you do.",
        },
        {
            name: "Devotion",
            cost: -15,
            description: "Choose an objective. This objective can be a personal goal, an ambition or anything alike, but cannot be too embracing (the GM has the final word on it). Whenever you perform a task that doesn't have a direct relation with your objective, you receive disadvantage on the test.",
        },
        {
            name: "Disease Vulnerability",
            cost: -10,
            exclusive: "Disease Resistance",
            description: "You receive major disadvantage on tests to resist diseases, and need a third successful test to heal from them.",
        },
        {
            name: "Heavy Sleeper",
            cost: -5,
            description: "Once your character is asleep, any attempt to wake them up early has major disadvantage, up to the discretion of the GM.",
        },
        {
            name: "Poison Vulnerability",
            cost: -10,
            exclusive: "Poison Resistance",
            description: "You receive major disadvantage on tests to resist poisoning and receive +50% damage from poisons.",
        },
        {
            name: "Power Restriction",
            cost: -10,
            description: "Choose something to be the focus of your restriction. When the situation or condition is present, you receive twice the amount of FP and AP on any task you perform.",
        },
        {
            name: "Simple Mind",
            cost: -10,
            description: "You cannot have group or skill bonuses on the Education and Charisma skill groups. You're also unable to speak or fully understand any human language.",
        },
        {
            name: "Strange Form - Armor",
            cost: -10,
            description: "Your body shape isn't fit to the usual types of clothing and armors. You must pay twice the value for any armor or clothing you buy, and it'll only fit you. You cannot use armor or clothing that isn't made specially for you.",
        },
        {
            name: "Strange Form - Vehicle",
            cost: -10,
            description: "You don't fit in most vehicles, needing them specially prepared for you, meaning you pay twice the price for them.",
        },
        {
            name: "Strange Form - Weapon",
            cost: -10,
            description: "You can't use common weapons, needing them specially prepared for you, meaning you pay twice the price for them.",
        },
        {
            name: "Weak Point",
            cost: -10,
            description: "You have a weak point that can be discovered with a test of Perception against your Deceive test. Anyone who knows your weak point can make use of it to gain advantage on every attack and dodge test against you.",
        },
        {
            name: "Moral Code",
            cost: -10,
            description: "You have a code which you never break. You are free to build up your code, but the GM has the final word on it. Whenever confronting a situation referred to your code, you will act under it. If you break your code, you suffer disadvantage on every test for the whole scene.",
        },
        {
            name: "Damage Vulnerability",
            cost: -30,
            description: "Choose a damage type. Against it, your defense receives a penalty of 10 and you receive major disadvantage on every test to avoid the damage.",
            stackable: true,
            dropdownMode: "damageType",
            enhancementMode: "any",
            enhancements: [{
                cost: -20,
                description: "Against this damage type, your defense is only the value given by your equipment, and you receive total disadvantage on every test to avoid it, never being able to use abilities that reduce this last effect."
            }]
        },
        {
            name: "Damage Weakness",
            cost: -10,
            description: "Choose a damage type. When hit by this damage type, you receive disadvantage.",
            stackable: true,
            dropdownMode: "damageType",
            enhancementMode: "any",
            enhancements: [{
                cost: -10,
                description: "Against this damage type, you receive +100% damage from this type."
            }]
        },
        {
            name: "Damage Inability",
            cost: -10,
            description: "You are unable to have an affinitiy with a specific damage type.",
            stackable: true,
            dropdownMode: "damageType",
        },
        {
            name: "Skill Inability",
            cost: -5,
            description: "You have disadvantage on all tests of this skill.",
            stackable: true,
            dropdownMode: "skills",
        },
        // Mental Disability Section
        {
            name: "Insanity",
            cost: -10,
            stackable: true,
            description: "sometimes you have strange behaviors that lack logic. You are free to describe your insanity.",
        },
        {
            name: "Phobia",
            cost: -20,
            stackable: true,
            description: "choose the subject of your phobia. Whenever this subject is present, you receive major disadvantage on every task and become unable to perform actions that require concentration.",
        },
        {
            name: "Faulty Reasoning",
            cost: -20,
            description: "You receive disadvantage on every test related to REA, including skills that use it.",
        },
        {
            name: "Faulty Instincts",
            cost: -20,
            description: "You receive disadvantage on every test related to INS, including skills that use it.",
        },
        // Physical Disability Section
        {
            name: "Faulty Strength",
            cost: -20,
            description: "You receive disadvantage on every test related to STR, including skills that use it.",
        },
        {
            name: "Faulty Agility",
            cost: -20,
            description: "You receive disadvantage on every test related to AGL, including skills that use it.",
        },
        {
            name: "Faulty Vigor",
            cost: -10,
            description: "You receive disadvantage on every test related to VIG, including skills that use it.",
        },
        {
            name: "Faulty Sense",
            cost: -5,
            description: "One of your senses is limited, causing you disadvantage on every test depending on it.",
        },
        {
            name: "Inability to Swim",
            cost: -10,
            description: "You instantly fail any swim checks unless you roll a nat 20.",
        }
    ],

}

export const abilities = getSortedAbilities(unsortedAbilities);