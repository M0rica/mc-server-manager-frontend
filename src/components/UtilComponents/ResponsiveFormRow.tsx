
interface RowProps {
    text: string
    children: any
}

function Row(props: RowProps) {
    return <div className="row">
        <div className="col-25">
            <label htmlFor="fname">{props.text}</label>
        </div>
        <div className="col-75">
            {props.children}
        </div>
    </div>
}

export default Row
