import './App.css';
import {useState, useEffect, useRef} from 'react';
import Note from './components/Note'
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/Login';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';

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
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] =  useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const noteFormRef = useRef()

  useEffect( () => {
    console.log('effect');
    noteService
      .getAll()
      .then( initialNotes => {
        console.log('promise fullfiled, initialNotes:',initialNotes);
        setNotes(initialNotes);
      });
  }, []);

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON);
      setUser( user );
      noteService.setToken( user.token );
    }
  }, [] );

  console.log('render ', notes.length, ' notes');

  const notesToShow = showAll ? notes : notes.filter( note => note.important === true );

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisiblity();
    noteService
        .create(noteObject)
        .then( returnedNote => {
         console.log('post promise fullfiled, returnedNote:', returnedNote);
         setNotes(notes.concat(returnedNote));
        });
  }

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with ', username, password);
    try{
      const user = await loginService.login( {
        username,
        password
      } );
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
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

  
  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm
        createNote={addNote} 
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {!user && 
        <Togglable buttonLabel='login'>
          <LoginForm 
            username={username} 
            password={password} 
            handleUsernameChange={ ( {target} ) => setUsername(target.value) } 
            handlePasswordChange={ ( {target} ) => setPassword(target.value) } 
            handleSubmit={handleLogin} 
          />
        </Togglable>
      }

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