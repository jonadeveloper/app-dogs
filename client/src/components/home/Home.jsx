import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getRaces } from '../../actions/actions';
import { Link } from 'react-router-dom';
import { Card } from '../card/Card';
import style from './css/home.module.css';
//import { Paginated } from '../paginated/Paginated';


export default function Home(){
    const dispatch = useDispatch();
    const allRaces = useSelector((state) => state.races);
    console.log(allRaces);
    const [currentPage , setCurrentPage] = useState(1);
    const [racesPerPage , setRacesPerPage] = useState(8);
    const lastIndex = currentPage * racesPerPage;
    console.log(lastIndex)
    const firstIndex = lastIndex - racesPerPage;
    console.log(firstIndex)
    //const currentRaces = allRaces.slice(firstIndex,lastIndex);

    const paginado = (pn)=>{
        setCurrentPage(pn)
    };
 
    useEffect(()=>{
        dispatch(getRaces())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRaces());
    }

    return(
        <div>
            <div>
            <button className={style.btn} onClick={e => {handleClick(e)}}>Reload</button>
            <Link to="/">
                <button className={style.btn}>◀ Go back</button>
            </Link>
            <Link to="/race">
                <button className={style.btn}>Create new race</button>
            </Link>
            </div>
            <div className="orders">
                <select name="abc">
                    <option value='asc_abc'>A - Z</option>
                    <option value='desc_abc'>Z - A</option>
                </select>
                <select name="weight">
                    <option value="asc_weight">from + to - weight</option>
                    <option value="desc_weight">from - to + weight</option>
                </select>
            </div>
            <div className="filters">
                <select name="temperament"> 
                    <option value="All">All temperaments</option>
                </select>
                <select name="race">
                    <option value="all">All the races</option>
                    <option value="api">existing</option>
                    <option value="created">created</option>
                </select>
            
            </div>

            {/* <Paginated 
            racesPerPage={racesPerPage}
            allRaces={allRaces.length}
            paginated={paginado}
            /> */}
            
            <div>
            {allRaces?.map((e) =>{
                    return(
                    <div> 
                        <Link to={'/home/' + e.id}>
                        <Card 
                        key={e.id}
                        name={e.name}
                        img={e.img}
                        weight={e.weight}
                        temper={e.temper}
                        />
                        </Link>
                    </div>)
                })
            }
            </div>
        </div>
    )
}