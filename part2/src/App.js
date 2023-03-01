import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import numberService from './services/numbers';

const App = () => {
  const [searchTarget, setSearchTarget] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

  useEffect( () => {
    console.log('effect: fetch persons with axios from json-server');
    numberService
      .getAll()
      .then( initialNumbers => {
        console.log('get Numbers done, response: ' , initialNumbers);
        setPersons(initialNumbers);
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
      numberService.addNewEntry(newPerson)
           .then( res => {
            console.log('newPerson added to server, respond:', res);
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
           } )
           .catch( err => {
            console.error('can\'t add to server, error:', err);
            alert('add fail');
           } )
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