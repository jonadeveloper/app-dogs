import axios from 'axios';
import {GET_RACES,
    GET_TEMPERAMENTS,
    FILTER_OF_TEMPERAMENTS,
    FILTERED_RACES_CREATED,
    ORDER_BY_NAME} from './const'

export function getRaces(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/races');
        return dispatch({
            type: GET_RACES,
            payload: json.data
        })
    };
}

export function getTemperaments(){
    return async function(dispatch){
    var jsonTemp = await axios.get('http://localhost:3001/tempers',{});
    return dispatch({
        type: GET_TEMPERAMENTS,
        payload: jsonTemp.data
    })
}
}

export function filterOfTemperaments(payload){
    console.log(payload)
    return{
        type: FILTER_OF_TEMPERAMENTS,
        payload
    }
}

export function filteredRacesCreated(payload){
    return{
        type: FILTERED_RACES_CREATED,
        payload
    }
}

export function orderByname(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}