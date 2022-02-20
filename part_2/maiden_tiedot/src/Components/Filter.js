import React from 'react'

const Empty = ({fCountries}) => {
  if (fCountries.length === 0) {
    return (<p>Too many matches</p>
    )} 
  else if (fCountries.length === 1) {
      const languages = fCountries[0].languages
      let langArray = []
      for (const [key, value] of Object.entries(languages)) {
        langArray.push(value)
      }
      return(
        <div>
          <p>Capital: {fCountries[0].capital}</p>
          <p>Population: {fCountries[0].population}</p>
          <h3>Languages</h3>
          {langArray.map(language => <li key={language}> {language}</li>)}
          <img src={fCountries[0].flags.png} width="100" height="50" alt='Flag'/>
        </div>
      )
  } else {
    return(
      <div>
        {fCountries.map(country => <p key={country.altSpellings[0]}>{country.name.common}</p>)}
      </div>
  )};
}
const Filter = ({handleFilter, newFilter, fCountries,filter}) => {
    return(
      <div>
        <form onSubmit={filter}>
          <input
            value={newFilter}
            onChange={handleFilter}
          />
          <button type="submit">Search</button>
        </form>
        <h1>Countries:</h1>
        <Empty fCountries={fCountries}/>
      </div>
    )
}
export default Filter