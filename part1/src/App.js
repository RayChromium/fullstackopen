const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Content = (props) => {
  // assuming there are exactly 3 items in the parts array
  console.log('props in Content():' , props);
  return (
    <>
    <Part p={props.parts[0].name} e={props.parts[0].exercises} />
    <Part p={props.parts[1].name} e={props.parts[1].exercises} />
    <Part p={props.parts[2].name} e={props.parts[2].exercises} />
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
  let total = 0;
  console.log('props in Total: ', props);
  props.parts.forEach((p)=>{
    total += p.exercises;
  });
  return (
    <>
     <p>Number of exercises {total}</p>
    </>
  )
}

export default App;
