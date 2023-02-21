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

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
  
}

const Statistics = (props) =>{
  return (
    <>
      Good : <Display counter={props.good}/> 
      Neutual : <Display counter={props.nuetral}/> 
      Bad : <Display counter={props.bad}/> 
      average : {props.totalVote === 0 ? 0 : (props.good + props.bad) / props.totalVote}  
      positive : { props.totalVote === 0 ? 0 : props.good / props.totalVote }
    </>
  )
}

const App = () => {


  // Part 1c

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

/*
// This would be if you store states in a single object
  // Part 1d: complicated states
  const [clicks, setClicks] = useState({
    left: 0, 
    right: 0
  });

  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      left: clicks.left + 1
      // does the same as:
      // left: clicks.left + 1,
      // right: clicks.right
    });
  }

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
      // does the same as:
      // left: clicks.left,
      // right: clicks.right + 1
    });
  }
  */

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue);
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  }

  

  // Exercise 1.6 - 1.14
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [nuetral, setNuetral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalVote, setTotalVote] = useState(0);


  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <h2>Part 1c : states and components</h2>
      <Display counter={counter} />
      <Button onClick={increseByOne} text='plus'/>
      <Button onClick={decreseByOne} text='minus'/>
      <Button onClick={setToZero} text='set zero'/>
      <h2>Part 1d: more complicated states</h2>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks} />
      {value}
      <Button onClick={() => setToValue(1000)} text='thousand'/>
      <Button onClick={() => setToValue(0)} text='reset'/>
      <Button onClick={() => setToValue(value + 1)} text='increment'/>
      <h3>Exercise 1.6 - 1.14</h3>
      <h4>1.6 Unicafe</h4>
      <Statistics good={good} nuetral={nuetral} bad={bad} totalVote={totalVote}/>
      <Button onClick={() => {
        setGood(good + 1);
        setTotalVote(totalVote + 1)
      }}  text='Good'/>
      <Button onClick={() => {
        setNuetral(nuetral + 1);
        setTotalVote(totalVote + 1);
      }}  text='Neutral'/>
      <Button onClick={() => {
        setBad(bad + 1);
        setTotalVote(totalVote + 1);
      }}  text='Bad'/>
    </div>
  )
}

// a Display component:
const Display = ({counter}) => <div>
      {counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

export default App;
