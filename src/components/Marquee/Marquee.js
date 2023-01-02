import React, {useEffect, useState} from 'react'
import Ticker from '../Ticker/Ticker'
import './Marquee.css'

function Marquee(props){

    const content = [
        '^GSPC',
        '^IXIC',
        '^DJI',
        '^GDAXI',
        '^OMXH25'
    ]

    function MarqueeContent(){
        let components = [];
        content.map(item => {
            components.push(<Ticker type='marqueeItem' key={item} name={item} />)
        })
        return components
    }

    return (
            <marquee>
                {/* {content.map(item => <Ticker type='marqueeItem' key={item} name={item} />)} */}
                <MarqueeContent />
            </marquee>
    )
}

export default Marquee;