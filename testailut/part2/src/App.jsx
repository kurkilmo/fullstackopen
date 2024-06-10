import { useEffect, useState, useRef } from 'react'
import Note from './components/Note'
import Login from './components/Login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
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
      <em>Muistiin pano sovellus :D</em>
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

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  const notesToShow = showAll ? notes : notes.filter(n => n.important)

  // Datan haku serveriltä
  useEffect(() => {
    noteService.getAll()
      .then(initNotes => setNotes(initNotes))
  }, [])

  // Kirjautuminen local storagesta
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      noteService.setToken(loggedUser.token)
    }
  }, [])

  const toggleImportance = (id) => {
    const prevNote = notes.find(n => n.id === id)
    const changedNote = { ...prevNote, important: !prevNote.important }

    noteService.update(id, changedNote).then(r => {
      setNotes(notes.map(n => n.id !== id ? n : r))
    })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const remove = (id) => {
    noteService.deleteNote(id).then(resp_ignored => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const logout = () => {
    const name = user.name
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken('')
    setErrorMessage(`Terve menoo ${name}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2500)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <Togglable buttonLabel='login' >
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </Togglable>
      <Togglable buttonLabel='new note' ref={noteFormRef} >
        <NoteForm createNote={addNote} />
      </Togglable>
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
      <div><button onClick={logout}>Kirjaudu ulos</button></div>
      <Footer />
    </div>
  )
}

export default App