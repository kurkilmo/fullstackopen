import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div className='noteForm'>
      <h2>Uus nootti</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          placeholder='kontsa tänne :)'
        />
        <button type="submit">tallentele</button>
      </form>
    </div>
  )
}

export default NoteForm