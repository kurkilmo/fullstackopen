/* eslint-disable react/prop-types */
import Note from './components/Note'
import { useEffect, useState } from 'react'
// import axios from "axios"
import noteService from './services/notes'
import loginService from './services/login'

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
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
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