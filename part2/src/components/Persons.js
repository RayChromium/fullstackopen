const Persons = (props) => {
    const {persons, searchTarget} = props;
    return (
      <>
      {persons.map( person => {
        if(searchTarget === '') {
          return <p key={person.id}>{person.name}: {person.number}</p>
        }
  
        if( person.name.toLocaleLowerCase().indexOf(searchTarget) !== -1 ) {
          return <p key={person.id}>{person.name}: {person.number}</p>
        }
        //it works?
        return [];
      } )}
      </>
      
    )
}

export default Persons;