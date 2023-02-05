import React from 'react';
import './LoadingSpinner.css'
import { Oval, ThreeCircles, RotatingLines, ColorRing } from  'react-loader-spinner';
//  import Loader from 'react-loader-spinner'

export function Loading_Oval(props){

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
}

export function Loading_RotatingLines(){
    return (
        <RotatingLines
    strokeColor="#fcfcfc"
    strokeWidth="5"
    animationDuration="0.75"
    width="20"
    visible={true}
    />
    )
}

export function ColorRing_Loader(){
    return(
        <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['1cd922', '#ff0303']}
        />
    )
}

