import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'

function App() {

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [fCountries, setfCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filter = (event) => {
    event.preventDefault()
    if (newFilter === '') {
      setfCountries([])
    } else {
      let filtered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      console.log(filtered)
      if (filtered.length > 10){
        setfCountries([])
      } else {
        setfCountries(filtered)
      }
    }
  }

  return (
    <div>
      <Filter newFilter={newFilter} 
        handleFilter={handleFilter} fCountries={fCountries}
        filter={filter}
      />
    </div>
  );
}

export default App;
