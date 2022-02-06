import React from "react";
import ReactDOM from "react-dom";

import "./Dialog.css"

interface DialogProps {
    text: string
    buttons: string[]
    visible: boolean
}


function Dialog(props: {options: DialogProps, result_ready: any }) {
    if (!props.options.visible) {
        return null
    }
    return ReactDOM.createPortal(
        <div className="dlg_background" onKeyPress={(e) => {
            if (e.key == "q"){
                props.options.visible = false
            }
        }}>
            <div className="dialog">
                <h2>{props.options.text}</h2>
                {
                    props.options.buttons.map((b)=>{
                        return <button onClick={() => props.result_ready(b)}>{b}</button>
                    })
                }
            </div>
        </div>
    , document.body)
}


export default Dialog
