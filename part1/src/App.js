import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;

  const name = 'Peter';
  const age = 10;

  console.log(now, a+b);
  return (
    <div>
      <Hello name='Ray' age={15+10}/>
      <Hello name={name} age={age} />
      <p>Hello World! It is {now.toString()}</p>
    </div>
  )
}

const Hello = (props) => {
  return (
    <div>
      <h1>Greetings {props.name}, </h1>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

export default App;
