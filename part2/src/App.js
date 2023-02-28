import './App.css';
import {useState, useEffect} from 'react';
import Note from './components/Note'
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

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
          alert(`The note ${note.content} was already deleted from the server`);
          setNotes( notes.filter(note => note.id !== id) );
         } );
  }

  return (
    <div>
      <h1>Notes</h1>
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
      <form onSubmit={addNote}>
        <input value={newNote}  onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App