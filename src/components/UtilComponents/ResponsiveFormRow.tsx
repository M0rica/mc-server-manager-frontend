
interface RowProps {
    text: string
    children: any
}

function Row(props: RowProps) {
    return <div className="row">
            <label htmlFor="fname">{props.text}</label>
            {props.children}
    </div>
}

export default Row
