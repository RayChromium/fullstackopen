import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import numberService from './services/numbers';

const Notification = ({message}) => {
  if(message === null) {
    return null;
  }

  if(message.level === 'info') {
    return (
      <div className='message'>
        {message.content}
      </div>
    )
  } else if(message.level === 'error') {
    return (
      <div className='message-error'>
        {message.content}
      </div>
    )
  }
}

const App = () => {
  const [searchTarget, setSearchTarget] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

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

    const targetIndex = persons.findIndex( person => person.name === newName );

    if( targetIndex === -1 ) {
      numberService.addNewEntry(newPerson)
           .then( res => {
            console.log('newPerson added to server, respond:', res);
            setPersons(persons.concat(newPerson));
            setMessage({level : 'info', content : `${newPerson.name} added to server`});
            setTimeout( () => setMessage(null), 3000 );
            setNewName('');
            setNewNumber('');
           } )
           .catch( err => {
            console.error('can\'t add to server, error:', err);
            alert('add fail');
           } )
    } else {
      newPerson.id = targetIndex + 1;
      numberService.updateEntry( newPerson.id, newPerson )
                   .then( addRes => {
                    console.log( `update ${newPerson.name} success, respond:`, addRes);
                   } );
      setPersons( persons.map( p => p.id !== newPerson.id ? p : newPerson ) );
      setNewName('');
      setNewNumber('');
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
      <Notification message={message} />
      <Filter setSearchTarget={setSearchTarget}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} addEntry={addEntry} persons={persons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchTarget={searchTarget} setPersons={setPersons}/>
    </div>
  )
}

export default App