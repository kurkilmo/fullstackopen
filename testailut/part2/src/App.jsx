import Note from './components/Note'
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(n => n.important)


  const addNote = (event) => {
    event.preventDefault()
    setNotes(notes.concat({
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'tärkeet' : 'kaikki' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">tallentele</button>
      </form>
    </div>
  )
}

export default App