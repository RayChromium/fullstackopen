const Filter = ({setSearchTarget}) => {

    const handleSearchTarget = (e) => {
      console.log('searching for:', e.target.value);
      setSearchTarget(e.target.value);
    }
  
    return <>filter shown with name: <input onChange={handleSearchTarget}/></>
}

export default Filter;