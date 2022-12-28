import React from "react";
import style from './css/paginated.module.css'

export function Paginated({ racesPerPage , allRaces , paginated }){
    const pageNumber = [];
    for (let i = 0; i < Math.ceil(allRaces/racesPerPage); i++) {
        pageNumber.push(i+1)
    }
    return(
        <nav className={style.paginado}>
            <ul>
            { pageNumber && pageNumber.map(n => (
                    <li key={n}>
                        <p onClick={() => paginated(n)}>{n}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}