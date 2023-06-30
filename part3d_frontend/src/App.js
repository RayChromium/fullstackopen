import './App.css';
import {useState, useEffect} from 'react';
import Note from './components/Note'
import noteService from './services/notes';
import loginService from './services/login';

const Notification = ({message}) => {
  if(message === null) {
    return null;
  }

  return (
    <div className='error'>{message}</div>
  )
}

const Footer = () => {
  // React inline styling
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] =  useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect( () => {
    console.log('effect');
    noteService
      .getAll()
      .then( initialNotes => {
        console.log('promise fullfiled, initialNotes:',initialNotes);
        setNotes(initialNotes);
      });
  }, []);

  console.log('render ', notes.length, ' notes');

  const notesToShow = showAll ? notes : notes.filter( note => note.important === true );

  const addNote = (event) => {
    event.preventDefault();
    console.log('addNote button pressed ', event.target);
    const noteObject = {
      content: newNote,
      important : Math.random() < 0.5, 
      id: notes.length + 1,
    }

    noteService
        .create(noteObject)
        .then( returnedNote => {
         console.log('post promise fullfiled, returnedNote:', returnedNote);
         setNotes(notes.concat(returnedNote));
         setNewNote('');
        });
  }

  const handleNoteChange = (event) => {
    console.log('target value of handleNoteChange',event.target.value);
    setNewNote(event.target.value);
  }

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with ', username, password);
    try{
      const user = await loginService.login( {
        username,
        password
      } );
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong Credentials');
      setTimeout( () => setErrorMessage(null) , 5000 );
    }
  }


  const toggleImportanceOf = id => {
    console.log(`The importance of ${id} needs to be toggled`);
    const note = notes.find( n => n.id === id );
    const changedNote = {...note, important: !note.important };

    noteService.update(id, changedNote)
         .then( returnedNote => {
          console.log(`importance of ${id} changed via PUT request by axios`);
          setNotes( notes.map( n => n.id === id ? returnedNote : n ) );
         } )
         .catch( error => {
          setErrorMessage(`The note '${note.content}' was already deleted from the server`);
          setTimeout( () => setErrorMessage(null), 5000 );
          setNotes( notes.filter(note => note.id !== id) );
         } );
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username 
          <input 
            type='text' 
            value={username} 
            name='Username' 
            onChange={ ({target}) => setUsername(target.value) }
          />
        </div>
        <div>
          password 
          <input 
            type='password' 
            value={password} 
            name='Password' 
            onChange={ ({target}) => setPassword(target.value) } 
          />
        </div>
        <button type='submit'>Login</button>
      </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
        <input value={newNote}  onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user && loginForm()}

      {user && <div>
       <p>{user.name} is logged in</p>
         {noteForm()}
      </div>}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      NB: notice the curly baces wrapping note.content in the li tag
      li element must have a "key" property
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>

      <Footer />
    </div>
  )
}

export default App