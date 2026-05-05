export default function ConfirmDialog({showConfirm, onConfirm, onCancel, children, abilityModal = false, confirmText = "confirm"}: {showConfirm: Boolean, onConfirm: any, onCancel: any, children: any, abilityModal?: Boolean, confirmText?: String,}){
    return(
    showConfirm && (
        <div className="modal-overlay">
            <div className={`modal ${abilityModal ? "ability-modal" : ""}`}>
            {children}

            <div className="modal-actions">
                { confirmText ?
                <button onClick={onConfirm}>
                Confirm
                </button> : <></>}

                <button onClick={onCancel}>
                Cancel
                </button>
            </div>
            </div>
        </div>
        )
    )  
}