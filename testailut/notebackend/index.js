const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())   // cross origin resource sharing
app.use(morgan('tiny'))   // logging
app.use(express.static('dist'))

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const genId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Morjens! >:)</h1>')
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(no => no.id === id)
  if (note) response.json(note)
  else response.send(404, 'eipä ollu!')
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(n => n.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({
      error: 'ei ollu kontsaa'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: genId()
  }
  console.log(note)
  notes = notes.concat(note)
  res.json(note)
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.put('/api/notes/:id', (req, res) => {
  const newNote = req.body
  console.log(newNote)
  notes = notes.map(n =>
    n.id === newNote.id ? newNote : n
  )
  res.status(200).json(newNote)
})

// middleware:
const unknownEndpoint = (request, response) => {
  response.status(418).end()
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})