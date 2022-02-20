import React from 'react'

const Course = ({course}) => {

  const Header = ({course}) => {
    return (
      <>
        <h1>{course.name}</h1>
      </>
    )
  
  }

  const Total = ({course}) => {
    return (
      <>
        <p> Number of exercises {course.parts.reduce((sum,part) => sum + part.exercises,0
        )}</p>
      </>
    )
  }
  
  const Parts = ({course}) => {
    return (
      <>
        {course.parts.map(part => <p key={part.id}>{part.name}: {part.exercises}</p>
        )}
      </>
    )
  }

  return(
    <div>
      <Header course={course}/>
      <Parts course={course}/>
      <Total course={course}/>
    </div>
  )
}


export default Course