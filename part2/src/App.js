import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [searchTarget, setSearchTarget] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  useEffect( () => {
    console.log('effect: fetch persons with axios from json-server');
    axios
      .get('http://localhost:3001/persons')
      .then( res => {
        console.log('axios fullfiled, response: ' , res);
        setPersons(res.data);
      } );
  }, [] );

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchTarget={setSearchTarget}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} addEntry={addEntry}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchTarget={searchTarget}/>
    </div>
  )
}

export default App