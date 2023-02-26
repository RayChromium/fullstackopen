import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12-23-4567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  const addEntry = (e) => {
    e.preventDefault();
    console.log('add button pressed, value in input:', newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if( persons.findIndex( person => person.name === newName ) === -1 ) {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameInput = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const handleNumberInput = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <div>
          <button type="submit" onClick={addEntry}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <p key={person.name}>{person.name}: {person.number}</p> )}
    </div>
  )
}

export default App