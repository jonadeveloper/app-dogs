import axios from 'axios';
import {GET_RACES,
    GET_TEMPERAMENTS,
    FILTER_OF_TEMPERAMENTS} from './const'

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
    return{
        type: FILTER_OF_TEMPERAMENTS,
        payload
    }
}