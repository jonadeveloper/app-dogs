import { 
    GET_RACES,
    FILTER_OF_TEMPERAMENTS,
    GET_TEMPERAMENTS,
    FILTERED_RACES_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_NAME_RACES,
    POST_RACE,
GET_DETAILL} from "../actions/const";

const initialState = {
    races : [],
    allRaces : [],
    temperaments: [],
    detaill: []
}


function rootReducer(state = initialState , action){
    var orderRace;
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
                : allRaces.filter((n) => n.temperament.includes(action.payload))
                return{
                    ...state,
                    races: tempersFiltered
                }
            case FILTERED_RACES_CREATED:
                const AllRaces = state.allRaces;
                const createdFilter = action.payload === 'api' ? AllRaces.filter(e => e.id <= 300) 
                : AllRaces.filter(e => e.id.length >= 4)
                return{
                    ...state,
                    races : action.payload === 'All' ? AllRaces.concat(createdFilter) : createdFilter
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
            case ORDER_BY_WEIGHT:
                if(action.payload === "asc"){
                        orderRace = state.allRaces.sort(function(a,b){
                        if (parseInt(a.minWeight) > parseInt(b.minWeight)){
                            return 1
                        }
                        if (parseInt(b.minWeight) > parseInt(a.minWeight)){
                            return -1
                        }
                        return 0;
                    })
                }else if(action.payload === "desc"){
                        orderRace = state.allRaces.sort(function (a,b){
                            if (parseInt(a.minWeight) > parseInt(b.minWeight)){
                                return -1
                            }
                            if (parseInt(b.minWeight) > parseInt(a.minWeight)){
                                return 1
                            }
                            return 0;

                        })
                }
                return{
                    ...state,
                    allRaces: orderRace
                }

            case GET_NAME_RACES:
                return{
                    ...state,
                    races: action.payload
                }
            case POST_RACE:
                return{
                    ...state
                }
            case GET_DETAILL:
                return{
                    ...state,
                    detaill: action.payload
                }
    
        default:
        return state
    }
}

export default rootReducer;