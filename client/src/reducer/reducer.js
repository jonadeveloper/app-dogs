import { 
    GET_RACES,
    FILTER_OF_TEMPERAMENTS,
    GET_TEMPERAMENTS
} from "../actions/const";

const initialState = {
    races : [],
    temperaments: []
}


function rootReducer(state = initialState , action){
    switch (action.type) {
        case GET_RACES:
            return{
                ...state,
                races: action.payload
            }
            case GET_TEMPERAMENTS:
                return{
                    ...state,
                    temperaments: action.payload
                }
        
    
        default:
            return{
                state
            } 
    }
}

export default rootReducer;