import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonAdd from './components/PersonAdd'
import Persons from './components/Persons'
import Message from './components/Message'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const[fpersons,setFpersons] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])

  const handlePersonChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      const foundPerson = persons.filter(person => person.name === newName)
      if (foundPerson.length > 0) {
        if (window.confirm(`${newName} is already in phonebook. Replace old number with new one?`)){
          const personObject = {
            name: foundPerson[0].name,
            number: newNumber
          }
          personService
            .update(foundPerson[0].id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== foundPerson[0].id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setType("success")
              setMessage(foundPerson[0].name + "s number replaced.")
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setType("warning")
              setMessage("the person " + foundPerson[0].name + " was already deleted from server")
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== foundPerson[0].id))
            })
        }
        
      } else {
        const personObject = {
          name: newName,
          number: newNumber
        }
        const name = newName
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        setType("success")
        setMessage(name + " added.")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
  }

  const deletePerson = (id) => {
    const selected = persons.filter(person => person.id === id)
    const name = selected[0].name
    if (window.confirm("Delete " + name + "?")){
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setType("success")
          setMessage(name + " deleted from server.")
          setTimeout(() => {
            setMessage(null)
            }, 5000)
        })
        .catch(error => {
          setType("warning")
          setMessage("the person " + name + " was already deleted from server")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleFilter = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
  }

  const filter = (event) => {
      event.preventDefault()
      if (newFilter === ''){
        setFpersons([])
      } else {
        let filtered = persons.filter(person => person.name.includes(newFilter))
        setFpersons(filtered)
      }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={type}/>
      <Filter fpersons={fpersons} filter={filter} 
        handleFilter={handleFilter} newFilter={newFilter}
      />
      <h3>Add new</h3>
      <PersonAdd handlePersonChange={handlePersonChange} 
        handleNumberChange={handleNumberChange} addPerson={addPerson}
        persons={persons} newName={newName} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {persons.map(person =>
        <Persons 
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )

}

export default App
