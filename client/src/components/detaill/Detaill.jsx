/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getDetaill } from '../../actions/actions'
import { useEffect } from "react";
import style from './css/detaill.module.css'
import Footer from "../footer/Footer";

export default function Detaill(props){
    console.log(props);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetaill(props.match.params.id))
    },[dispatch, props.match.params.id])

    const myRace = useSelector((state) => state.detaill)
    return(
        <div>
            <Link to="/home">
                <button className={style.btn}>◀ Go Home</button>
            </Link>
            {
                myRace.length > 0 ?
                <div className={style.cardDetaill}>
                    <h1 className={style.title}>{myRace[0].name}</h1>
                    <img className={style.img} src={myRace[0].img} alt='not found' width='350px'/>
                    <h3>min-Height : {myRace[0].minHeight} cm</h3>
                    <h3>max-Height : {myRace[0].maxHeight} cm</h3>
                    <h3>min-Weight : {myRace[0].minWeight} kg</h3>
                    <h3>max-Weight : {myRace[0].maxWeight} kg</h3>
                    <h3>Life expectancy : {myRace[0].life_span}</h3>
                    <h3>Temperament : {myRace[0].temperament}</h3>
                </div>
                :
                <h1>Loading...</h1>
            }
            <br/>
        </div>
    )

}

