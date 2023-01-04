import React, {useEffect, useState} from 'react'
import Ticker from '../Ticker/Ticker'
import ReactMarquee from "react-fast-marquee";
import './Marquee.css'

function Marquee(props){

    const content = [
        '^GSPC',
        '^IXIC',
        '^DJI',
        '^GDAXI',
        '^OMXH25'
    ]

    const contentComponents = content.map(item => <Ticker type='marqueeItem' key={item} name={item} />)

    return (
        <ReactMarquee className = 'marquee' gradient={false}>
            {contentComponents}
            {contentComponents}
        </ReactMarquee>

    )
}

export default Marquee;