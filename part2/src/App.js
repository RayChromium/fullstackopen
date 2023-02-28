import './App.css';
import {useState, useEffect} from 'react';
import Note from './components/Note'
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect( () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then( res => {
        console.log('promise fullfiled, response:',res);
        setNotes(res.data);
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

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log('target value of handleNoteChange',event.target.value);
    setNewNote(event.target.value);
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
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}  onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App