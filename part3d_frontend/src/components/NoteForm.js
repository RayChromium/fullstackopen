const NoteForm = ( {onSubmit, handleChange, value} ) => {
    return (
        <form onSubmit={onSubmit}>
            <input value={value}  onChange={handleChange}/>
            <button type='submit'>save</button>
        </form>
    )
}

export default NoteForm;