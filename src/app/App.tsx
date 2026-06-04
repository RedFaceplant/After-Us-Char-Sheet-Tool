import { useState } from "react";
import { clamp } from "ramda"
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./store";
import { setMetaInfo } from "../redux/metaSlice";

import "../styles/App.css";
import {type Stats, defaultStats, defaultMetaInfo, type Degrees} from "./types"

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
  const dispatch = useDispatch()

  const [stats, setStats] = useState<Stats>(defaultStats);
  const [showImagePopup, setShowImagePopup] = useState(false)

  const darkMode = useSelector(
    (state: RootState) => state.settings.darkMode
  )

  const {degree, imageUrl, name} = useSelector(
    (state: RootState) => state.metaInfo
  )

  const handleStatChange = (
    category: keyof Stats,
    key: string,
    value: number
  ) => {
    switch (category){
      case "baseStats":{
        value = clamp(0, levelCaps[degree].basic, value);
        break;
      }
      case "skillGroups":{
        value = clamp(0, levelCaps[degree].group, value);
        break;
      }
      case "skills":{
        value = clamp(0, levelCaps[degree].skill, value);
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

  const setImageURL = () => {
    const { value } = document.getElementById("imageURL") as HTMLInputElement

    if(!value){
      dispatch(setMetaInfo({
        imageUrl: defaultMetaInfo.imageUrl
      }))
      return
    }

    dispatch(setMetaInfo({
      imageUrl: value
    }))
  }



  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Toolbar
      stats={stats} setStats={setStats}
      />

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
                  value={name}
                  onChange={e => dispatch(setMetaInfo({name: e.target.value}))}
                />
              </div>
              <hr />
              <div className="char-image">
                <img 
                  src={imageUrl}
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
                      <input id="imageURL" type={"text"} defaultValue={imageUrl} />
                    </label>
                  </ConfirmDialog>
              </div>
            </div>
            <div className="middle-top">
              <div className="mints-spacer"></div>
              <SecondaryStatTable stats={stats}/>
              <br />
              <BasicStatTable stats={stats} setStats={handleStatChange}/>
            </div>

            {/* Row 2 (skills table spans 2 columns) */}
            <div className="skill-table-holder">
              <SkillsTable stats={stats} setStats={handleStatChange}/>
            </div>
            
          </div>

          {/* Right column bottom content */}
          <div className="right-column">
            <div className="mints-spacer" />
            <div className="name-row">
              <AbilityButton 
                stats={stats}
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
            <AbilityZone/>
            <AbilityZone flawsZone/>
            <NoteZone/>
            <div className="mints-spacer" />
          </div>
        </div>
      </main>
    </div>
  );
}