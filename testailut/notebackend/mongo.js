const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kurkilmo:${password}@bmur0.ebkja2y.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Bmur0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)


  const note = new Note({
    content: 'kakone',
    important: true,
  })

  note.save().then(ignored => {
    console.log('note saved!')
    mongoose.connection.close()
  })
})
