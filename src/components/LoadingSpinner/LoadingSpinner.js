import React from 'react';
import './LoadingSpinner.css'
import { Oval, ThreeCircles } from  'react-loader-spinner'

function LoadingSpinner(props){

    return (
        <ThreeCircles
            height="100"
            width="100"
            color="#1cd922"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor="#ff0303"
        />
        )

    // return(
    //         <Oval
    //             height="50"
    //             width="50"
    //             color='red'
    //             ariaLabel='loading'
    //             wrapperClassName = 'ovalWrapper'
    //         />
    // ) 
}

export default LoadingSpinner;