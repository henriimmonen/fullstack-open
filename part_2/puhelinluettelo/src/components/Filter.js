import React from 'react'

const Filter = ({fpersons, filter, handleFilter, newFilter}) => {

    return(
      <div>
        <p>Filter names: </p>
        <form onSubmit={filter}>
          <div>
            <input
              value={newFilter}
              onChange={handleFilter}
            />
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
        <h3>Filtered numbers</h3>
        <ul>
          {fpersons.map(person =>
            <p key={person.name}>{person.name} {person.number}</p>
          )}
        </ul>
      </div>
    )
}
export default Filter