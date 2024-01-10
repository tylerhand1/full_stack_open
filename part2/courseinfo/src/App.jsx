const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
        {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
