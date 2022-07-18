import React from 'react';
import './SearchResult.css'
import add_button_image from './add_button.png'

function SearchResult(props){

    return(
        <ol>
        <div className="container">
            <h1>{props.shortname}</h1>
            <h1>{props.ticker}</h1>
            <button onClick = {() => {props.addTicker(props.ticker)}}> <img className="add_button_image" src={add_button_image} /> </button>
        </div>
        </ol>)
}

export default SearchResult;