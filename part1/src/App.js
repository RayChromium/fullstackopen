const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} e1={exercises1} e2={exercises2} e3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part p={props.part1} e={props.e1} />
    <Part p={props.part2} e={props.e2} />
    <Part p={props.part3} e={props.e3} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.p} {props.e}</p>
    </>
  )
}

const Total = (props) =>{
  return (
    <>
     <p>Number of exercises {props.total}</p>
    </>
  )
}

export default App;
