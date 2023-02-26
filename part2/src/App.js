import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addEntry = (e) => {
    e.preventDefault();
    console.log('add button pressed, value in input:', newName);
    const newPerson = {
      name: newName,
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const handleNameInput = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          <button type="submit" onClick={addEntry}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <p key={person.name}>{person.name}</p> )}
    </div>
  )
}

export default App