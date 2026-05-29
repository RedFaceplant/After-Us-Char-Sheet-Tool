import { useEffect, useState } from "react";
import { clamp, isNotEmpty, isNotNil } from "ramda"

import "../styles/App.css";
import {type Stats, defaultStats, type Settings, defaultSettings, type Degrees} from "./types"
import {type RenderedAbility} from "../assets/abilityList"

import Toolbar from '../components/Toobar'
import BasicStatTable from "../components/BasicStatTable";
import SecondaryStatTable from "../components/SecondaryStatTable";
import AbilityZone from "../components/AbilityZone";
import NoteZone from "../components/NoteZone";
import SkillsTable from "../components/SkillsTable";
import AbilityButton from "../components/AbilityButton"
import ConfirmDialog from "../lib/ConfirmDialog";

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

export default function App() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [currentAbilities, setCurrentAbilities] = useState<RenderedAbility[]>([])
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [currentDamageAffinities, setCurrentDamageAffinities] = useState<string[]>([])
  const [currentSpells, setCurrentSpells] = useState<string[]>([])

  const { darkMode } = settings

  // Update currentSpells and currentDamageAffinities whenever the abilities list changes
  useEffect(() => {
    let affinities: string[] = []
    let spells: string[] = []

    currentAbilities.forEach(ability => {
      if(isNotNil(ability.spells) && isNotEmpty(ability.spells)){
        spells = [...spells, ...ability.spells]
      }

      if(ability.name == "Damage Affinity" && isNotNil(ability.dropdownSelection)){
        affinities.push(ability.dropdownSelection)
      }
    })

    if(affinities.length == 0){
      affinities = ["no affinities"]
    }

    if(spells.length == 0){
      spells = ["no known spells"]
    }

    setCurrentDamageAffinities(affinities)
    setCurrentSpells(spells)
  }, [currentAbilities])

  const handleSettingChange = (
    key: string,
    value: boolean,
  ) => {
    setSettings((prev) => ({
        ...prev,
        [key]: value,
      }))
  }

  const handleStatChange = (
    category: keyof Stats,
    key: string,
    value: number
  ) => {
    switch (category){
      case "baseStats":{
        value = clamp(0, levelCaps[stats.characterInfo.degree].basic, value);
        break;
      }
      case "skillGroups":{
        value = clamp(0, levelCaps[stats.characterInfo.degree].group, value);
        break;
      }
      case "skills":{
        value = clamp(0, levelCaps[stats.characterInfo.degree].skill, value);
        break;
      }
    }
    setStats((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleStatChangeString = (
    category: keyof Stats,
    key: string,
    value: string
  ) => {
    
    setStats((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const setImageURL = () => {
    const { value } = document.getElementById("imageURL") as HTMLInputElement

    if(!value){
      handleStatChangeString("metaStats", "image", defaultStats.metaStats.image)
      return
    }

    handleStatChangeString("metaStats", "image", value)
  }



  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Toolbar 
      settings={settings}
      setSettings={handleSettingChange}
      stats={stats} setStats={setStats}
      currentAbilities={currentAbilities}
      setCurrentAbilities={setCurrentAbilities}
      ></Toolbar>

      {/* Scrollable main content */}
      <main className="main-content">
        <div className="page">
          <div className="main-grid">
            {/* Row 1 */}
            <div className="left-top">
              <div className="name-row">
                <span className="name-label">Name:</span>
                <input
                  type="text"
                  placeholder="Character Name"
                  className="character-name"
                  value={stats.metaStats.name}
                  onChange={e => handleStatChangeString("metaStats", "name", e.target.value as string)}
                />
              </div>
              <hr />
              <div className="char-image">
                <img 
                  src={stats.metaStats.image}
                  onClick={
                    () => setShowImagePopup(true)
                  } />
                  <ConfirmDialog
                    onConfirm={
                      () => {
                        setImageURL()
                        setShowImagePopup(false)
                      }
                    }
                    onCancel={() => setShowImagePopup(false)}
                    showConfirm={showImagePopup}
                  >
                    <label className="image-url">
                      <b>Set Image URL</b>
                      <br/>
                      <input id="imageURL" type={"text"} defaultValue={stats.metaStats.image} />
                    </label>
                  </ConfirmDialog>
              </div>
            </div>
            <div className="middle-top">
              <div className="mints-spacer"></div>
              <SecondaryStatTable stats={stats} setStats={handleStatChangeString} abilities={currentAbilities}></SecondaryStatTable>
              <br />
              <BasicStatTable stats={stats} setStats={handleStatChange}></BasicStatTable>
            </div>

            {/* Row 2 (skills table spans 2 columns) */}
            <div className="skill-table-holder">
              <SkillsTable stats={stats} setStats={handleStatChange} settings={settings}></SkillsTable>
            </div>
            
          </div>

          {/* Right column bottom content */}
          <div className="right-column">
            <div className="mints-spacer" />
            <div className="name-row">
              <AbilityButton 
                currentAbilities={currentAbilities} 
                setCurrentAbilities={setCurrentAbilities} 
                stats={stats}
                currentDamageAffinities={currentDamageAffinities}
                currentSpells={currentSpells}
              />
              <button 
                className="ability-button" 
                disabled
                onClick={
                    () => {
                        console.log("This button shouldn't be clickable. yet...")
                    }
                }
              >
                Add Special Attack
              </button>
            </div>
            <hr />
            <AbilityZone currentAbilities={currentAbilities} setCurrentAbilities={setCurrentAbilities} />
            <AbilityZone flawsZone currentAbilities={currentAbilities} setCurrentAbilities={setCurrentAbilities} />
            <NoteZone stats={stats} handleStatChangeString={handleStatChangeString} />
            <div className="mints-spacer" />
          </div>
        </div>
      </main>
    </div>
  );
}