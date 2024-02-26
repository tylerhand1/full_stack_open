import { useEffect, useState, useTransition } from 'react'
import axios from 'axios'

import ContactService from './services/contacts'

const Notification = ({message, haveError}) => {
  if(message === null) {
    return null
  }

  return (
    <div className={`message ${haveError ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

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
  const [message, setMessage] = useState(null)
  const [haveError, setHaveError] = useState(false)

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
      const foundPerson = persons.find(person => person.name === newName)
      const msg = `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      
      if(confirm(msg)) {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: foundPerson.id
        }
  
        ContactService
          .update(newPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setnewNumber('')

            setMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${newPerson.name} has already been removed from the server`)
            setHaveError(true)

            setTimeout(() => {
              setMessage(null)
              setHaveError(false)
            }, 5000)
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    ContactService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(newPerson, returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setnewNumber('')

        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000) 
      })
      .catch(error => {
        setMessage(`Name is too short: needs to be at least 3 characters long`)
        setHaveError(true)

        setTimeout(() => {
          setMessage(null)
          setHaveError(false)
        }, 5000)
      })
  }

  const delName = (id) => {
    const msg = `Delete ${persons.find(person => person.id === id).name}?`
    if(confirm(msg)) {
      ContactService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage(`Information of this user has already been removed from the server`)
          setHaveError(true)

          setTimeout(() => {
            setMessage(null)
            setHaveError(false)
          }, 5000)
          // Update contacts to reflect server
          ContactService
            .getAll()
            .then(returnedContacts => {
              setPersons(returnedContacts)
            })
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
      <Notification message={message} haveError={haveError} />
      <Filter value={filter} setFilter={setFilter} />
      <h2>Add a New</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setnewNumber} />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} delName={delName} />
    </div>
  )
}

export default App
