import { useEffect, useState } from 'react'
import numberService from './services/phonebook'

const Person = ({person, removeHandler}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => removeHandler(person.id)}>delete</button>
    </div>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.name} onChange={props.onNameChange}/>
        </div>
        <div>
          number: <input value={props.number} onChange={props.onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const PersonList = ({persons, removeHandler}) => {
  return (
    persons.map(person => <Person removeHandler={removeHandler} key={person.id} person={person}/>
    )
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return <div style={{height: 59}}></div>
  }
  const notificationStyle = {
    color: `${message[1]}`
  }
  return (
    <div className="notification" style={notificationStyle}>
      {message[0]}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const displayNotification = (text, color) => {
    setNotification([text, color])
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  useEffect(() => {
    numberService.getAll().then(resp => {
      setPersons(resp)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const replaceNumber = person => {
    const newPerson = {...person, number:newNumber}
    numberService.update(newPerson.id, newPerson).then(resp => {
      setPersons(persons.map(p => p.id === newPerson.id ? newPerson : p))
      displayNotification(`Changed number of ${resp.name} to ${resp.number}`)
    }).catch(error => {
      displayNotification(`Information of ${person.name} has already been removed from server`, "red")
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (replace) {
        replaceNumber(persons.find(p => p.name === newName))
      }
      return
    }
    if (newName.trim() === '') return;

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    numberService.add(newPerson).then(resp => {
      setPersons(persons.concat(resp))
      setNewNumber('')
      setNewName('')
      displayNotification(`Added ${resp.name}`, "green")
    })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = (id) => {
    const personName = persons.find(p => p.id === id).name
    const prompt = `Delete ${personName}?`
    if (!window.confirm(prompt)) return
    numberService.remove(id).then(resp => {
      setPersons(persons.filter(p => p.id !== id))
      displayNotification(`Removed ${resp.name}`, "green")
    }).catch(error => {
      displayNotification(`Information of ${personName} has already been removed from server`, "red")
    })
  }

  const filteredPersons = persons.filter(p => 
    p.name.toUpperCase().includes(filter.toUpperCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} removeHandler={removePerson}/>
    </div>
  )

}

export default App