const PersonForm = (props) => {
    const {newName, handleNameInput, newNumber, handleNumberInput, addEntry} = props;
  
    return (
      <form>
          <div>
            name: <input value={newName} onChange={handleNameInput}/>
          </div>
          <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
          <div>
            <button type="submit" onClick={addEntry}>add</button>
          </div>
        </form>
    )
}

export default PersonForm;