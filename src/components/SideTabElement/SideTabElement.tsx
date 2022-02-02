import {useState} from "react";
import {Link} from "react-router-dom";

import {mdiArrowLeft} from "@mdi/js";
import {Icon} from "@mdi/react";

import "./SideTabElement.css"

export interface ElementProps {
    element: any
    tab_text: string
}

interface Props {
    elements: ElementProps[]
}

function SideTabElement(props: Props) {

    const [current_index, set_current_index] = useState(0)


    return <div>
        <div className="side_tab_bar">
            <ul>
                <li>
                    <Link to="/"><Icon path={mdiArrowLeft} size="16px"/> Back</Link>
                </li>
                {
                    props.elements.map((element, i) => {
                            return <li>
                                <a onClick={() => set_current_index(i)} className={current_index === i ? "active" : ""}>{element.tab_text}</a>
                            </li>
                        }
                    )
                }

            </ul>
        </div>
        <div className="side_tab_content">
            {
                props.elements[current_index].element
            }
        </div>
    </div>
}

export default SideTabElement
