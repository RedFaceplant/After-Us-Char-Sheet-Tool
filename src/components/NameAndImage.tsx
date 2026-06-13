
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { setMetaInfo } from "../redux/metaSlice";

import {defaultMetaInfo} from "../app/types"


import ConfirmDialog from "../lib/ConfirmDialog";


export default function NameAndImage(){
    const dispatch = useDispatch()

    const [showImagePopup, setShowImagePopup] = useState(false)

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
        <>
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
                      </>
    )
}