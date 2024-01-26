import { useEffect, useState, useTransition } from 'react'
import axios from 'axios'

import ContactService from './services/contacts'

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

const Persons = ({numbersToShow, delName}) => {
  return (
    <>
      {numbersToShow.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => delName(person.id)}>delete</button></p>
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
    ContactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
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
      id: `${persons.length + 1}`
    }

    ContactService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setnewNumber('')
      })
  }

  const delName = (id) => {
    const msg = `Delete ${persons.find(person => person.id === id).name}?`
    if(confirm(msg)) {
      ContactService
        .remove(id)
        .then(delContact => {
          setPersons(persons.filter(person => person.id !== delContact.id))
        })
    }    
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
      <Persons numbersToShow={numbersToShow} delName={delName} />
    </div>
  )
}

export default App
