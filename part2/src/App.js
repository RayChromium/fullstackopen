import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12-23-4567', id: 1  },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }  
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTarget, setSearchTarget] = useState('');

  const addEntry = (e) => {
    e.preventDefault();
    console.log('add button pressed, value in input:', newName);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
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

  const handleSearchTarget = (e) => {
    console.log('searching for:', e.target.value);
    setSearchTarget(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with name: <input onChange={handleSearchTarget}/>
      <h2>add a new</h2>
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
      {persons.map( person => {
        if(searchTarget === '') {
          return <p key={person.id}>{person.name}: {person.number}</p>
        }

        if( person.name.toLocaleLowerCase().indexOf(searchTarget) !== -1 ) {
          return <p key={person.id}>{person.name}: {person.number}</p>
        }
        //it works?
        return [];
      } )}
    </div>
  )
}

export default App