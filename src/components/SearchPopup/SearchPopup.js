import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import './SearchPopup.css'
import SearchResult from './SearchResult/SearchResult'

function SearchPopup(props){

  const [searchResults, setSearchResults] = useState([]);
  const [manualInput, setManualInput] = useState("");
  
  function handleInputChange(event){
    const searchWord = event.target.value;
    if (searchWord){
      fetch(`https://portfolioserver-rqvj6ywtea-lz.a.run.app/search/${searchWord}`)
      .then(response => {return response.json()})
      //.then(response => console.log(response))
      .then(response => {setSearchResults(response)})
      console.log(searchResults)
    }
  }

  function handleManualInput(){
    props.addTicker(manualInput.toUpperCase());
    setManualInput("");
  }
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [])

    return(  
        <Popup
        trigger={<button id="add_button"> Add </button>}
        position="top center"
        modal
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="content">
              <div className = 'searchBar'>
                  <input className='searchInput' type='text' placeholder='Search Ticker' onChange={handleInputChange}/>
                  <div className='searchIcon'></div>
              </div>
              <div className="manualDiv">
                <label>Add manually</label>
                <input className="manualInput" type="text" value={manualInput} placeholder='Trading Symbol' onChange={(e) => setManualInput(e.target.value)}></input>
                <button className='manualAddButton' onClick={handleManualInput}>Add</button>
              </div>
              <div className = 'results'>
                <ul>
                {searchResults.map(result => (<SearchResult
                                              ticker = {result.symbol}
                                              shortname = {result.shortname}
                                              addTicker = {props.addTicker}
                                              />))} 
                </ul>                       
              </div>
            </div>
          </div>
        )}
      </Popup>   
    )
}

export default SearchPopup;