import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import './SearchPopup.css'
import SearchResult from './SearchResult/SearchResult'

function SearchPopup(props){

  const [searchResults, setSearchResults] = useState([]);
  
  function handleInputChange(event){
    const searchWord = event.target.value;
    fetch(`http://localhost:8000/search/${searchWord}`)
      .then(response => {return response.json()})
      //.then(response => console.log(response))
      .then(response => {setSearchResults(response)})
      console.log(searchResults)
  }

  

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