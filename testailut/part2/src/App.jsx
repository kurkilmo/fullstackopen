import Note from './components/Note'
import { useEffect, useState } from 'react'
import axios from "axios"
import noteService from './services/notes'

const Footer = () => {
  const style = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={style}>
      <br />
      <em>Muistiin pano sovellus</em>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const notesToShow = showAll ? notes : notes.filter(n => n.important)

  // Datan haku serveriltä
  useEffect(() => {
    noteService.getAll()
    .then(initNotes => setNotes(initNotes))
  }, [])

  const toggleImportance = (id) => {
    const prevNote = notes.find(n => n.id === id)
    const changedNote = {...prevNote, important: !prevNote.important}

    noteService.update(id, changedNote).then(r => {
      setNotes(notes.map(n => n.id !== id ? n : r))
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    if (newNote === '') return
    const newNoteObject = {
      //id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService.create(newNoteObject).then(resp => {
      setNotes(notes.concat(resp))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const reset = () => {
    noteService.reset().catch(error => {
      setErrorMessage("mikä on ku ei toimi")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    })
  }

  const remove = (id) => {
    noteService.deleteNote(id).then(resp => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'tärkeet' : 'kaikki' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id} 
            note={note} 
            toggleImportant={() => toggleImportance(note.id)} 
            remove={() => remove(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">tallentele</button>
      </form>
      <div><button onClick={reset}>tyhjennä</button></div>
      <Footer />
    </div>
  )
}

export default App