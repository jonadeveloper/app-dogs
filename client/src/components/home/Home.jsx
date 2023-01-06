import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getRaces,
getTemperaments,
filterOfTemperaments,
filteredRacesCreated,
orderByname, 
orderByWeight} from '../../actions/actions';
import { Link } from 'react-router-dom';
import { Card } from '../card/Card';
import style from './css/home.module.css';
import { Paginated } from '../paginated/Paginated';
import SearchBar from '../searchBar/SearchBar';
import Footer from '../footer/Footer';


export default function Home(){
    const dispatch = useDispatch();
    const allRaces = useSelector((state) => state.races);
    console.log(allRaces);
    const allTempers = useSelector((state) => state.temperaments)
    const [currentPage , setCurrentPage] = useState(1);
    const [racesPerPage , setRacesPerPage] = useState(8);
    const lastIndex = currentPage * racesPerPage;
    console.log(lastIndex)
    const firstIndex = lastIndex - racesPerPage;
    console.log(firstIndex)
    const currentRaces = allRaces.slice(firstIndex,lastIndex);
    const [orden,setOrden] = useState('');

    const paginado = (pn)=>{
        setCurrentPage(pn)
    };
 
    useEffect(()=>{
        dispatch(getRaces());
        dispatch(getTemperaments());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRaces());
    }

    function handleFilterTempers(e){
        e.preventDefault();
        dispatch(filterOfTemperaments(e.target.value));
    }

    function handleFilteredRacesCreated(e){
        e.preventDefault();
        dispatch(filteredRacesCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByname(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return(
        <div>
            <SearchBar />
            <div>
            <button className={style.btn} onClick={(e) => {handleClick(e)}}>Reload</button>
            <Link to="/">
                <button className={style.btn}>◀ Go back</button>
            </Link>
            <Link to="/create">
                <button className={style.btn}>Create new race</button>
            </Link>
            </div>
            <div>
            <div  className={style.containFiltersAndOders}>
                <span className={style.nameOrder}>order alphabetically : </span>
                <select className={style.selectOder} onChange={e => handleSort(e)}>
                    <option>select an option</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <span className={style.nameOrder}>sort by weight : </span>
                <select className={style.selectOder} onChange={e => handleSortWeight(e)} name="weight">
                    <option>select an option</option>
                    <option value="asc">min to max</option>
                    <option value="desc">max to min</option>
                </select>
            </div>
            <div  className={style.containFiltersAndOders}>
                <span className={style.nameFilter}>filter by temperaments : </span>
                <select className={style.selectFilter} onChange={e => handleFilterTempers(e)}> 
                    <option>select an option</option>
                    <option value="All">All temperaments</option>
                    {allTempers.map(e => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
                <span className={style.nameFilter}>filter by existing or created : </span>
                <select className={style.selectFilter} onChange={e => handleFilteredRacesCreated(e)}>
                    <option>select an option</option>
                    <option value="all">All the races</option>
                    <option value="api">existing</option>
                    <option value="created">created</option>
                </select>
            
            </div>
            </div>

            <Paginated 
            racesPerPage={racesPerPage}
            allRaces={allRaces.length}
            paginated={paginado}
            />
            
            <div className={style.containerCards}>
            {currentRaces?.map((e) =>{
                    return(
                    <div className={style.divCard}> 
                        <Link to={'/home/' + e.id}>
                        <Card 
                        key={e.id}
                        name={e.name}
                        img={e.img}
                        minWeight={e.minWeight}
                        maxWeight={e.maxWeight}
                        temper={e.temper}
                        />
                        </Link>
                    </div>)
                })
            }
            <Footer />
            </div>
        </div>
    )
}