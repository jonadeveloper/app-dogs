/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getDetaill } from '../../actions/actions'
import { useEffect } from "react";

export default function Detaill(props){
    console.log(props);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetaill(props.match.params.id))
    },[dispatch, props.match.params.id])

    const myRace = useSelector((state) => state.detaill)
    return(
        <div>
            {
                myRace.length > 0 ?
                <div>
                    <h1>{myRace[0].name}</h1>
                    <img src={myRace[0].img} alt='not found'/>
                    <h3>{myRace[0].height}</h3>
                    <h3>{myRace[0].weight}</h3>
                    <h3>{myRace[0].life_span}</h3>
                    <h3>{myRace[0].temper}</h3>
                </div>
                :
                <h1>gh</h1>
            }
        </div>
    )

}

