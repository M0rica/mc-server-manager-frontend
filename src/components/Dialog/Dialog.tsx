import React from "react";

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
    return (
        <div className="dlg_background" onKeyPress={(e) => {
            if (e.key == "q"){
                props.options.visible = false
            }
        }}>
            <div className="dialog">
                <h2>{props.options.text}</h2>
                {
                    props.options.buttons.map((b)=>{
                        return <button onClick={() => props.result_ready(b)} key={b}>{b}</button>
                    })
                }
            </div>
        </div>
    )
}


export default Dialog
