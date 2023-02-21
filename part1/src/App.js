import { useState } from "react";

const Hello = (props) => {
  // Destructuring 
  const {name, age} = props;
  // component helper function
  const bornYear = () => new Date().getFullYear() - age;



  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you are probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {

  const [counter, setCounter] = useState(0);

  // setInterval( ()=> setCounter(counter + 1) , 1000);

  console.log('rendering with counter value', counter);

  // const handleClick = () => {
  //   console.log('Clicked!')
  // }

  const increseByOne = () => {
    console.log('increasing, value before', counter);
    setCounter(counter + 1);
  }
  const decreseByOne = () => {
    console.log('decreasing, value before', counter);
    setCounter(counter - 1);
  }
  const setToZero = () =>{
    console.log('resetting to zero, value before', counter);
    setCounter(0);
  } 

  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Display counter={counter} />
      <Button onClick={increseByOne} text='plus'/>
      <Button onClick={decreseByOne} text='minus'/>
      <Button onClick={setToZero} text='set zero'/>
    </div>
  )
}

// a Display component:
const Display = ({counter}) => <div>
      {counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

export default App;
