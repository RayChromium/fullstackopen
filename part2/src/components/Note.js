const Note = ({note, toggleImportance}) => {
    const lable = note.important ? 'make not important' : 'make important';
    return (
        <>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>{lable}</button>
        </>
    );
}

export default Note;