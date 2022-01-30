import React, {useState} from "react";

interface IProps {
    children: any[]
    default_visible?: boolean
}

function Accordion(props: IProps) {

    const [visible, set_visible] = useState(props.default_visible)

    if (visible === undefined)
        set_visible(false)

    return <div>
        <button type="button" onClick={_ => set_visible(!visible)}>Show advanced options</button>
        <div hidden={!visible}>
            {
                props.children.map((comp: Element) => {
                        return comp
                    }
                )
            }
        </div>
    </div>
}

export default Accordion
