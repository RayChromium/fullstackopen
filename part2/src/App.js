import './App.css';
import Note from './components/Note'


const App = ({ notes } ) => {

  return (
    <div>
      <h1>Notes</h1>
      NB: notice the curly baces wrapping note.content in the li tag
      li element must have a "key" property
      <ul>
        {notes.map(note => <Note key={note.id} note={note}/>)}
      </ul>
    </div>
  )
}

export default App