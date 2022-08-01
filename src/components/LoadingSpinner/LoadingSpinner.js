import React from 'react';
import './LoadingSpinner.css'
import { Oval } from  'react-loader-spinner'

function LoadingSpinner(props){

    return <Oval
    height="15"
    width="15"
    color='white'
    ariaLabel='loading'
    />

}

export default LoadingSpinner;