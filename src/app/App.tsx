import "../styles/App.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./store";
import { setMetaInfo } from "../redux/metaSlice";

import {defaultMetaInfo} from "./types"

import Toolbar from '../components/Toobar'
import BasicStatTable from "../components/BasicStatTable";
import SecondaryStatTable from "../components/SecondaryStatTable";
import AbilityZone from "../components/AbilityZone";
import NoteZone from "../components/NoteZone";
import SkillsTable from "../components/SkillsTable";
import AbilityButton from "../components/AbilityButton"
import ConfirmDialog from "../lib/ConfirmDialog";


export default function App() {
  const dispatch = useDispatch()
  const [showImagePopup, setShowImagePopup] = useState(false)

  const darkMode = useSelector(
    (state: RootState) => state.settings.darkMode
  )

  const {imageUrl, name} = useSelector(
    (state: RootState) => state.metaInfo
  )

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
      <Toolbar />

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
              <SecondaryStatTable/>
              <br />
              <BasicStatTable/>
            </div>

            {/* Row 2 (skills table spans 2 columns) */}
            <div className="skill-table-holder">
              <SkillsTable/>
            </div>
            
          </div>

          {/* Right column bottom content */}
          <div className="right-column">
            <div className="mints-spacer" />
            <div className="name-row">
              <AbilityButton/>
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