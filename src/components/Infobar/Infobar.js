
import {React, useContext} from 'react'
import { Totalvalue  } from '../Totalvalue/Totalvalue';
import { PriceChangeToday, ChangePercentToday } from '../ChangeToday/ChangeToday'
import TopGainers from '../Gainers/Gainers';

import "./Infobar.css"

function Infobar(props) {


  return (
       <table className="gainersTable" style={{width: '50%'}}> 
            <thead className = 'gainersHeader'>
                <tr>
                    <th>PORTFOLIO STATS</th>
                    <th></th>
                </tr>
            </thead>
           <tr>
                {/* <td>
                    logged in as {user ? user.displayName : 'nothing'}
                </td> */}
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
                   <PriceChangeToday /> €
               </td>
           </tr>
           <tr>
               <td>
                   CHANGEPCT TDY
               </td>
                   {ChangePercentToday()} 
           </tr>
       </table>
  )
}
export default Infobar
