import { useState } from "react";
import ConfirmDialog from "../lib/ConfirmDialog";
import { type Settings, type Stats, defaultStats } from "../app/types";
import { type RenderedAbility } from "../assets/abilityList";
import { toKebabCase } from "../lib/util";


const exportData = (stats: Stats, abilities: RenderedAbility[]) => {
  const data = {
    exportedAt: new Date().toISOString(),
    toolVersion: 1,
    stats,
    abilities
  };

  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${toKebabCase(stats.metaStats.name ?? "Unnamed")}-After-Us-data.json`;
  a.click();

  URL.revokeObjectURL(url);
};


const importData = (
  file: File,
  setStats: Function,
  setAbilities: Function
) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const text = event.target?.result as string;
      const parsed = JSON.parse(text);

      if (!parsed.stats || !parsed.abilities) {
        throw new Error("Invalid file format");
      }

      setStats(parsed.stats);
      setAbilities(parsed.abilities);
    } catch (err) {
      console.error(err);
      alert(`Failed to import file.\nMessage: '${err}'`);
    }
  };

  reader.readAsText(file);
};


export default function Toolbar({settings, setSettings, stats, setStats, currentAbilities, setCurrentAbilities} : {settings: Settings, setSettings: Function, stats: Stats, setStats: Function, currentAbilities: RenderedAbility[], setCurrentAbilities: Function}){
    const [showNewCharDialog, setShowNewCharDialog] = useState(false);
    const [showImportDialog, setShowImportDialog] = useState(false)
    const {darkMode} = settings

    return (
        <header className="toolbar">
        <div className="toolbar-left">
          <b>After Us Assistant </b>
          <button onClick={() => setShowNewCharDialog(true)}>New Sheet</button>
          <button onClick={() => exportData(stats, currentAbilities)}>Export</button>
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
                    importData(file, setStats, setCurrentAbilities)
                  }
                }}>
              </input>
            </label>
          </ConfirmDialog>
        </div>
        <div className="toolbar-right">
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setSettings("darkMode", !darkMode)}
            />
          </label>
          <div className="copyright">&copy; King 2026</div>
        </div>
        <ConfirmDialog showConfirm={showNewCharDialog} onConfirm={() => {
          setShowNewCharDialog(false),
          setStats(defaultStats),
          setCurrentAbilities([])
        }} onCancel={() => setShowNewCharDialog(false)}>Are you sure you want to make a new character sheet?<br />This will not save your current sheet.</ConfirmDialog>
      </header>
    )
}