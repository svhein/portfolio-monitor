import React from 'react';
import './SearchResult.css'
import add_button_image from './add_button.png'

function SearchResult(props){

    return(
        <ol>
        <div  onClick = {() => {props.addTicker(props.ticker)}} className="searchContainer">
            <h1>{props.shortname}{'   '}{props.ticker}</h1>
        </div>
        </ol>)
}

export default SearchResult;