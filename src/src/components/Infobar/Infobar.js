
import React from 'react'
import Totalvalue from '../Totalvalue/Totalvalue';
import "./Infobar.css"

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
                   SECOND
               </td>
               <td>
                   <Totalvalue />
               </td>
           </tr>

       </table>
    </div>
  )
}


export default Infobar
