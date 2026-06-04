import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { setMetaInfo } from "../redux/metaSlice";

import "../styles/App.css";

export default function NoteZone(){
    const dispatch = useDispatch()
    
    const notes = useSelector(
      (state: RootState) => state.metaInfo.notes
    )

    return(
        <div className="note-zone">
            Notes:
            <br />
            <textarea 
            className="note-input"
            value={notes}
            onChange={e => dispatch(setMetaInfo({
                notes: e.target.value
            }))}/>
        </div>
    )
}