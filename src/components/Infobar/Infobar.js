
import React from 'react'
import { Totalvalue  } from '../Totalvalue/Totalvalue';
import { PriceChangeToday, ChangePercentToday } from '../ChangeToday/ChangeToday'

import "./Infobar.css"

// uuteen layouttiin:
// %-osuudet horisontaalisena palkkina
// day low-high kynttil' vertikaaliseen

function Infobar(props) {
  return (
    <div>
       <table className="infoTable">
           <tr>
               <td >
                   TOTAL
               </td>
               <td>
                   <Totalvalue />
               </td>
           </tr>
           <tr>
               <td>
                   CHANGE TDY
               </td>
               <td>
                   <PriceChangeToday />
               </td>
           </tr>
           <tr>
               <td>
                   CHANGEPCT TDY
               </td>
               <td>
                   {ChangePercentToday()} %
               </td>
           </tr>
       </table>
    </div>
  )
}
export default Infobar
