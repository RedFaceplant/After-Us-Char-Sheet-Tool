import "../styles/App.css";
import { type Stats } from "../app/types";

export default function NoteZone({stats, handleStatChangeString}: {stats: Stats, handleStatChangeString: Function}){
    return(
        <div className="note-zone">
            Notes:
            <br />
            <textarea 
            className="note-input"
            value={stats.metaStats.notes}
            onChange={e => handleStatChangeString("metaStats", "notes", e.target.value as string)}/>
        </div>
    )
}