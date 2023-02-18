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

const App = (props) => {
  const {counter} = props;
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Counter counter={counter} />
    </div>
  )
}

// a counter component:
const Counter = (props) => {
  const {counter} = props;
  return (
    <div>
      {counter}
    </div>
  )
}

export default App;
