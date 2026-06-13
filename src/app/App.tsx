import "../styles/App.css";

import { useSelector } from "react-redux";
import { type RootState } from "./store";


import Toolbar from '../components/Toobar'
import BasicStatTable from "../components/BasicStatTable";
import SecondaryStatTable from "../components/SecondaryStatTable";
import AbilityZone from "../components/AbilityZone";
import NoteZone from "../components/NoteZone";
import SkillsTable from "../components/SkillsTable";
import AbilityButton from "../components/AbilityButton"
import NameAndImage from "../components/NameAndImage";

export default function App() {
  const darkMode = useSelector(
    (state: RootState) => state.settings.darkMode
  )

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Toolbar />

      {/* Scrollable main content */}
      <main className="main-content">
        <div className="page">
          <div className="main-grid">
            {/* Row 1 */}
            <div className="left-top">
              <NameAndImage />
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

        {/* Right column content */}
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