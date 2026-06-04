import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { setSettings } from "../redux/settingsSlice";
import { setStats } from "../redux/statsSlice";

import { useState } from "react";

import ConfirmDialog from "../lib/ConfirmDialog";
import { defaultStats, defaultMetaInfo, type Stats, type MetaInfo } from "../app/types";
import { type RenderedAbility } from "../assets/abilityList";
import { toKebabCase } from "../lib/util";
import { clearAbilities, setAbilities } from "../redux/abilitiesSlice";
import { setMetaInfo } from "../redux/metaSlice";


const exportData = ({stats, abilities, metaInfo}: {stats: Stats, abilities: RenderedAbility[], metaInfo: MetaInfo}) => {
  const data = {
    exportedAt: new Date().toISOString(),
    toolVersion: 1,
    stats,
    abilities,
    metaInfo
  };

  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${toKebabCase(metaInfo.name ?? "Unnamed")}-After-Us-data.json`;
  a.click();

  URL.revokeObjectURL(url);
};


const importData = (
  file: File,
  dispatch: any
) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const text = event.target?.result as string;
      const parsed = JSON.parse(text);

      if (!parsed.stats || !parsed.abilities) {
        throw new Error("Invalid file format");
      }

      let metaInfo = defaultMetaInfo

      if(parsed.toolVersion == 0){
        console.log(parsed)
        metaInfo = {...parsed.stats.characterInfo, ...parsed.stats.metaStats}
      }
      else{
        metaInfo = parsed.metaInfo ?? defaultMetaInfo
      }

      dispatch(setStats(parsed.stats))
      dispatch(setAbilities(parsed.abilities))
      dispatch(setMetaInfo(metaInfo))
    } catch (err) {
      console.error(err);
      alert(`Failed to import file.\nMessage: '${err}'`);
    }
  };

  reader.readAsText(file);
};


export default function Toolbar(){
    const dispatch = useDispatch()

    const [showNewCharDialog, setShowNewCharDialog] = useState(false);
    const [showImportDialog, setShowImportDialog] = useState(false)

    const settings = useSelector(
      (state: RootState) => state.settings
    )
    const { darkMode, showAssociatedStat } = settings

    const metaInfo = useSelector(
      (state: RootState) => state.metaInfo
    )
    const stats = useSelector(
      (state: RootState) => state.stats
    )
    const abilities = useSelector(
      (state: RootState) => state.currentAbilities.abilities
    )

    return (
        <header className="toolbar">
        <div className="toolbar-left">
          <b>After Us Assistant </b>
          <button onClick={() => setShowNewCharDialog(true)}>New Sheet</button>
          <button onClick={() => exportData({metaInfo, stats, abilities})}>Export</button>
          <button onClick={() => setShowImportDialog(true)}>Import</button>
          <ConfirmDialog
            confirmText=""
            onConfirm={() => console.log("whoops")}
            onCancel={() => setShowImportDialog(false)}
            showConfirm={showImportDialog}
          >
            <b>WARNING! Uploading a file will override the existing sheet!</b>
            <br/><br/>
            <label className="ability-label">
              <span>Import from:</span>
              <input 
                type="file" 
                accept="application/json" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file){
                    setShowImportDialog(false)
                    importData(file, dispatch)
                  }
                }}>
              </input>
            </label>
          </ConfirmDialog>
        </div>
        <div className="toolbar-right">
          <label>
            Show Associated Stats
            <input
              type="checkbox"
              checked={showAssociatedStat}
              onChange={
                (e) => dispatch(setSettings({showAssociatedStat: e.target.checked}))
              }
            />
          </label>
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={darkMode}
              onChange={
                (e) => dispatch(setSettings({darkMode: e.target.checked}))
              }
            />
          </label>
          <div className="copyright">&copy; King 2026</div>
        </div>
        <ConfirmDialog showConfirm={showNewCharDialog} onConfirm={() => {
          setShowNewCharDialog(false),
          dispatch(setStats(defaultStats))
          dispatch(setMetaInfo(defaultMetaInfo))
          dispatch(clearAbilities())
        }} onCancel={() => setShowNewCharDialog(false)}>Are you sure you want to make a new character sheet?<br />This will not save your current sheet.</ConfirmDialog>
      </header>
    )
}