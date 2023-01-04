import React from 'react';
import './LoadingSpinner.css'
import { Oval } from  'react-loader-spinner'

function LoadingSpinner(props){

    return(
        <div className = 'ovalContainer'>
            <Oval
                height="50"
                width="50"
                color='red'
                ariaLabel='loading'
                wrapperClassName = 'ovalWrapper'
            />
        </div>
    ) 
}

export default LoadingSpinner;