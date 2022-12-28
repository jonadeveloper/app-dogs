import { 
    GET_RACES,
    FILTER_OF_TEMPERAMENTS,
    GET_TEMPERAMENTS,
    FILTERED_RACES_CREATED,
    ORDER_BY_NAME} from "../actions/const";

const initialState = {
    races : [],
    allRaces : [],
    temperaments: []
}


function rootReducer(state = initialState , action){
    switch (action.type) {
        case GET_RACES:
            return{
                ...state,
                races: action.payload,
                allRaces: action.payload
            }
            case GET_TEMPERAMENTS:
                return{
                    ...state,
                    temperaments: action.payload
                }
            case FILTER_OF_TEMPERAMENTS:
                const allRaces = state.allRaces;
                const tempersFiltered = action.payload === 'All' ? allRaces
                : allRaces.filter(n => n.temper.includes(action.payload))
                return{
                    ...state,
                    races: tempersFiltered
                }
            case FILTERED_RACES_CREATED:
                const AllRaces = state.allRaces;
                const createdFilter = action.payload === 'created' ? AllRaces.filter(e => e.createInDb) 
                : AllRaces.filter(e => !e.createInDb)
                return{
                    ...state,
                    races : action.payload === 'All' ? state.allRaces : createdFilter
                }
            case ORDER_BY_NAME:
                let sortArr = action.payload === 'asc' ?
                state.races.sort(function (a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
                }):
                state.races.sort(function (a,b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    races: sortArr
                }
    
        default:
        return state
    }
}

export default rootReducer;