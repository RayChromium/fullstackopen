import numberService from '../services/numbers';


const Persons = (props) => {
    const {persons, searchTarget, setPersons} = props;

    const handleDeleteOf = (person) => {
      numberService.deleteEntry(person.id, person)
                   .then( deleteRes => {
                    console.log(`${person.name} info deleted, respond:`, deleteRes);
                    setPersons( persons.filter( p => p.id !== person.id ) ) ;
                   } );
    };

    return (
      <>
      {persons.map( person => {
        if(searchTarget === '') {
          return <p key={person.id}>
                  {person.name}: {person.number}
                  <button onClick={() => {
                    if(window.confirm(`Delete ${person.name} from phonebook?`)) {
                      handleDeleteOf(person)}
                    }
                  }>Delete</button>
                </p>
        }
  
        if( person.name.toLocaleLowerCase().indexOf(searchTarget) !== -1 ) {
          return <p key={person.id}>
                  {person.name}: {person.number}
                  <button onClick={() => {
                    if(window.confirm(`Delete ${person.name} from phonebook?`)) {
                      handleDeleteOf(person)}
                    }
                  }>Delete</button>
                </p>
        }
        //it works?
        return [];
      } )}
      </>
      
    )
}

export default Persons;