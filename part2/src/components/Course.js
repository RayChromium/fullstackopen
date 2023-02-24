const Header = (props) => {
    console.log('props in Header:',props);
    return (
      <>
        <h1>
          {props.course}
        </h1>
      </>
    )
}

const Total = (props) =>{
    console.log('props in Total: ', props);
    // props.parts.forEach((p)=>{
    //   total += p.exercises;
    // });
    const total = props.parts.reduce((s, p) => {
      console.log('what is happening', s, p)
      return s + p.exercises; 
    }, 0);
    console.log('total1 : ', total);
    return (
      <>
       <p>Number of exercises {total}</p>
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

const Content = (props) => {
    // assuming there are exactly 3 items in the parts array
    console.log('props in Content():' , props);
    return (
      <>
      <Part p={props.course.name} e={props.course.exercises} />
      </>
    )
}

const Course = (props) => {
    console.log('props passed in Course: ', props);

    return (
        <>
            <Header course={props.course.name}/>
            {props.course.parts.map( course =>  {
                console.log('course: ', course);
                return <Content key={course.id} course={course}/>
            } )}
            <Total parts={props.course.parts}/>
        </>
    )
}

export default Course;