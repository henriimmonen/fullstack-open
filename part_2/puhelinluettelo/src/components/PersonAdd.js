import React from 'react'

const PersonAdd = ({handlePersonChange, handleNumberChange, 
    addPerson, persons, newName, newNumber}) => {
    return(
      <div>
        <form onSubmit={addPerson}>
        <div>
          <p>name: </p>
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <p>number: </p>
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
        </form>
      </div>
    )
}
export default PersonAdd