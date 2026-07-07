## Todo

- [ ] Defensive Stance
  - [ ] Add missing ability.
  - [ ] Add prerequisite: AGI 6.
  - [ ] Add enhancement (+10 Amazing).
    - [ ] Changes Total Defense bonus from +5 to +10.
    - [ ] Enhancement requires AGI 11.

- [ ] Die Hard
  - [ ] Add missing ability.
  - [ ] Add prerequisite: VIG 6.
  - [ ] Add enhancement: continue acting after defeat until reaching FL.
  - [ ] Add enhancement: advantage against death by shock.
  - [ ] Add Amazing enhancement: major advantage against death by shock.
    - [ ] Add prerequisite: VIG 11.
  - [ ] Add Epic enhancement: total advantage against death by shock.
    - [ ] Add prerequisite: VIG 16.

- [ ] Mobility
  - [ ] Add missing ability.
  - [ ] Description: no disadvantage on Acrobatics dodge tests during rounds in which you moved.

- [ ] Rage
  - [ ] Add missing ability.
  - [ ] Add prerequisite: STR 2.
  - [ ] Description should include:
    - [ ] Bonus action to enter rage.
    - [ ] Advantage on STR and Brawl checks/saving throws.
    - [ ] +2 weapon damage with Brawl weapons.
    - [ ] Resistance to Smash and Slash.
    - [ ] Will save to remain at 1 HP instead of dropping to 0.
    - [ ] Cannot cast spells or maintain concentration.
    - [ ] Rage ending conditions.
    - [ ] Long rest required to regain rage.
  - [ ] Add +10 enhancement.
    - [ ] One additional rage use.
    - [ ] +1 attack bonus.
    - [ ] Repeatable up to STR times.
    - [ ] Attack bonus capped at +5.
  - [ ] Add Amazing enhancement.
    - [ ] Recover one rage use after every short rest.
  - [ ] Add Amazing enhancement.
    - [ ] Rage only ends by unconsciousness or voluntarily ending it.

- [ ] Alternate Form
  - [ ] Expand description to mention changing forms leaves you off guard.
  - [ ] Expand description to mention taking damage interrupts the transformation.
  - [ ] Expand description to mention HP/FP/AP transfer rules when changing forms.

- [ ] Attractive
  - [ ] Add missing ability.
  - [ ] Add `dropdownMode` (choose a base stat).
  - [ ] Add enhancement chain.

- [ ] Extra Attractive
  - [ ] Add missing ability.
  - [ ] Add prerequisite: Attractive.
  - [ ] Add `dropdownMode` (choose one of your Attractive stats).

- [ ] Extra Limb
  - [ ] Add missing ability.
  - [ ] Set `stackable: true`.

- [ ] Fusion
  - [ ] Expand description to mention:
    - Uses highest group bonuses and skill bonuses.
    - Starts with full HP.
    - FP/AP initialization rules.
    - HP/AP split when fusion ends.
    - Remaining FP becomes EFL.
  - [ ] Expand Epic enhancement to mention:
    - Target must resist with Endurance.
    - Target may attempt to break free every round.
  - [ ] Expand Special text to mention:
    - Controller of the fusion.
    - Size restrictions.
    - Two-character limit.

- [ ] Imitate
  - [ ] Expand base description to mention:
    - FP cost calculation.
    - Gain traits of copied target.
    - Cannot imitate size-related abilities.
    - Special maximum copied abilities wording.
  - [ ] Expand enhancement descriptions to include duration, FP rules, and action costs where appropriate.
  - [ ] Add Special text indicating all imitations disappear when defeated or unconscious.

- [ ] Invisibility
  - [ ] Expand description to mention:
    - Aggressive actions end invisibility.
    - Receiving damage ends invisibility.
    - Becoming unconscious/defeated ends invisibility.

- [ ] Possession
  - [ ] Expand description to mention:
    - Will vs Endurance check.
    - Target can attempt to expel you every round.
    - FP equals target's highest stat.
    - Lasts one scene.

- [ ] Skeptic
  - [ ] Expand description to mention:
    - [ ] Advantage disappears after succeeding.
    - [ ] Effect is not cumulative.

- [ ] Evasion
  - [ ] Add missing ability.
  - [ ] Add prerequisite: Acrobatics bonus 2.
  - [ ] Description:
    - [ ] Well-succeeded dodges no longer grant FP.
  - [ ] Add enhancement.
    - [ ] Dodging never grants FP.

- [ ] Masterpiece
  - [ ] Add missing ability.
  - [ ] Cost: 30.
  - [ ] Prerequisite: Crafting bonus 5.
  - [ ] Description:
    - [ ] Can create higher quality items and items with improvements.

- [ ] Self Sufficient
  - [ ] Add missing ability.
  - [ ] Cost: 20.
  - [ ] Prerequisite:
    - [ ] Skill bonus 3 on at least five different skills.
  - [ ] Description:
    - [ ] When at least 50 squares from allies, gain +2 on every test.

- [ ] Skill Adeptness
  - [ ] Add missing ability.
  - [ ] Cost: 10.
  - [ ] Set `stackable: true`.
  - [ ] Add `dropdownMode` for skill selection.
  - [ ] Add prerequisite:
    - [ ] Selected skill bonus 2.
  - [ ] Description:
    - [ ] Spend 1 FP to gain advantage on the selected skill.
  - [ ] Special:
    - [ ] Once per skill (handled by dropdown + stackable behavior).

- [ ] Bad Appearance
  - [ ] Add `dropdownMode` for stat selection.
    - [ ] The rulebook requires choosing a stat.
  - [ ] Description is sufficient.

- [ ] Bad Reputation
  - [ ] Add `exclusive: "Good Reputation"`.

- [ ] Channeling
  - [ ] Expand description to mention:
    - [ ] Losing or destroying the item causes Frightened for one scene.
  - [ ] (Optional) Mention replacement item requires 3d6 days of adjustment.

- [ ] Damage Weakness
  - [ ] Correct base description.
    - [ ] Rulebook: attacker has advantage.
    - [ ] JSON: you receive disadvantage.
  - [ ] These are usually equivalent mechanically, but advantage on the attacker is the correct wording and interacts better with other advantage/disadvantage rules.

- [ ] Mental Disability
  - [ ] Split implementation is intentional.
  - [ ] Add missing ability: Faulty Spirit.
    - [ ] Cost: -15.
    - [ ] Reduces AL and FL.
  - [ ] Existing Mental Disability abilities require no changes.

- [ ] Physical Disability
  - [ ] Split implementation is intentional.
  - [ ] Add missing ability: Faulty Health.
    - [ ] Cost: -20.
    - [ ] Reduces HP size multiplier.
  - [ ] Add missing ability: Reduced Mobility.
    - [ ] Cost: -10.
    - [ ] Halves movement.
  - [ ] Add missing ability: Reduced Stamina.
    - [ ] Cost: -15.
    - [ ] Reduces FL, MFL, and EFL.
  - [ ] Existing Physical Disability abilities require no changes.

- [ ] Skill Inability
  - [ ] Add `exclusive: "Skill Adeptness"`.

- [ ] Strange Form
  - [ ] Split implementation is intentional.
  - [ ] Strange Form - Armor
    - [ ] Add `exclusive: "Extra Limb"`.
  - [ ] Strange Form - Vehicle
    - [ ] Rename to **Strange Form - Mount** to match the rulebook terminology.
      - [ ] (Optional if "Vehicle" is preferred terminology throughout the webapp.)
  - [ ] Strange Form - Weapon
    - [ ] No changes.

- [ ] Damage Inability
  - [ ] Add `exclusive: "Damage Affinity"`.
  - [ ] Fix typo in description:
    - [ ] "affinitiy" → "affinity".

- [ ] Known Spell
  - [ ] Set `stackable: true`.
    - [ ] This ability is intended to be purchased repeatedly.
  - [ ] No other changes.

- [ ] Aethermantia
  - [ ] Add Amazing enhancement.
    - [ ] Allows magic attacks to deal Aether damage.

- [ ] Iasimantia
  - [ ] Add Amazing enhancement.
    - [ ] Cast granted spells at Amazing degree.

- [ ] Biomantia
  - [ ] Expand description (or add special text) to mention:
    - [ ] Magic attacks may use Poison damage.

- [ ] Kinesismantia
  - [ ] Add Amazing enhancement.
    - [ ] Cast granted spells at Amazing degree.

- [ ] Psyquemantia
  - [ ] Add missing ability.
  - [ ] Cost: 20.
  - [ ] Prerequisite:
    - [ ] Medicine bonus 3.
  - [ ] Spells:
    - [ ] Sleep.
  - [ ] Add Amazing enhancement.
    - [ ] Sleep becomes Amazing.
    - [ ] Learn Speechless.
    - [ ] Learn Motionless.
    - [ ] Magic attacks may use Psychic damage.
  - [ ] Add Epic enhancement.
    - [ ] Cast granted spells at Epic degree.

- [ ] Taktikosmantia
  - [ ] Add missing ability.
  - [ ] Cost: 10.
  - [ ] Prerequisites:
    - [ ] Magus.
    - [ ] Magic bonus 5.
  - [ ] Grants spell:
    - [ ] Range.
  - [ ] Add enhancement:
    - [ ] Guided Bolt.
  - [ ] Add Amazing enhancement.
    - [ ] Ballistics.
    - [ ] Requires Polemosmantia.
  - [ ] Add Amazing enhancement.
    - [ ] Telekinesis.
    - [ ] Requires Kinesismantia.

- [ ] Illusimantia
  - [ ] Add missing ability.
  - [ ] Cost: 15.
  - [ ] Prerequisite:
    - [ ] Mantia.
  - [ ] Grants:
    - [ ] Illusion.
    - [ ] Self-Copy.
  - [ ] Add Amazing enhancement.
    - [ ] Cast at Amazing degree.
    - [ ] Learn Invisibility.
  - [ ] Add Epic enhancement.
    - [ ] Cast at Epic degree.

- [ ] Hydromantia
  - [ ] Add missing ability.
  - [ ] Cost: 15.
  - [ ] Prerequisite:
    - [ ] Mantia.
    - [ ] Magic bonus 2.
  - [ ] Grants:
    - [ ] Ball of Water.
    - [ ] Flood.
    - [ ] Waterwalk.
    - [ ] Purify Water.
  - [ ] Add special text:
    - [ ] Magic attacks may use Water damage.

- [ ] Magus
  - [ ] Add missing ability.
  - [ ] Cost: 10.
  - [ ] Prerequisite:
    - [ ] Mantia.
    - [ ] Magic bonus 4.
  - [ ] Add Amazing, Epic, and Divine enhancement chain.

- [ ] Reckless Casting
  - [ ] Add missing ability.
  - [ ] Cost: 10.
  - [ ] Prerequisite:
    - [ ] Mantia.
    - [ ] Magic bonus 3.
  - [ ] Description should summarize:
    - [ ] Declare before casting.
    - [ ] Gain advantage on magic checks this turn.
    - [ ] Failed spells deal damage to you.
    - [ ] Enemies gain advantage attacking you until your next turn.

- [ ] Spell Adeptness
  - [ ] Add missing ability.
  - [ ] Cost: 5.
  - [ ] Set `stackable: true`.
  - [ ] Add `dropdownMode` for spell selection.
  - [ ] Prerequisite:
    - [ ] Mantia.
  - [ ] Description:
    - [ ] Reduce AP accumulation by 1 (minimum 1).
  - [ ] Add repeatable enhancement.
    - [ ] Additional AP reduction.
    - [ ] Cost increases by 5 each purchase.
    - [ ] Cannot reduce below 1 AP.

## Missing abilities

- [ ] Attractive
- [ ] Extra Attractive
- [ ] Extra Limb
- [ ] Defensive Stance
- [ ] Die Hard
- [ ] Heavy Hands
- [ ] Mobility
- [ ] Rage
- [ ] Combat Veteran
- [ ] Evasion
- [ ] Masterpiece
- [ ] Self Sufficient
- [ ] Skill Adeptness
- [ ] Psyquemantia
- [ ] Taktikosmantia
- [ ] Illusimantia
- [ ] Hydromantia
- [ ] Magus
- [ ] Reckless Casting
- [ ] Spell Adeptness
- [ ] Faulty Spirit
- [ ] Faulty Health
- [ ] Reduced Mobility
- [ ] Reduced Stamina

## Death stare .mp3

- [ ] Special Attack