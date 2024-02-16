const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((init, b) => init + b.exercises, 0)
  return (
    <div className="total">
      <p>total of {sum} exercises</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course