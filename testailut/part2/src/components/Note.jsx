const Note = ({note, toggleImportant, remove}) => {
    const label = note.important ? "turhaks" : "tärkeeks"

    return (
        <li className="listaus">
            {note.content}
            <button onClick={toggleImportant}>{label}</button>
            <button onClick={remove}>X</button>
        </li>
    )
}

export default Note