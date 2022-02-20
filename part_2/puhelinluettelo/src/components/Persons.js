import React from 'react'

const Persons = ({name, number, deletePerson}) => {
    return(
      <div>
        <p>{name} {number}</p>
        <button onClick={deletePerson}> Delete </button>
      </div>

    )
}
export default Persons