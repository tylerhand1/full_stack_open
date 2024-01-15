import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      filter: <input
        value={filter}
        onChange={handleFilterChange}
      />
    </>
  )
}

const PersonForm = ({addName, newName, setNewName, newNumber, setNewNumber}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange} 
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({numbersToShow}) => {
  return (
    <>
      {numbersToShow.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const found = persons.findIndex(person => person.name === newName)
    if(found !== -1) {
      // Found
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setnewNumber('')
  }

  // https://stackoverflow.com/questions/35235794/filter-strings-in-array-based-on-content-filter-search-value for filter
  const numbersToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setFilter={setFilter} />
      <h2>Add a New</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setnewNumber} />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} />
    </div>
  )
}

export default App
