import React , {useState , useEffect} from "react";
import { Link , useHistory } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { getTemperaments , postRace } from "../../actions/actions";
export default function RaceCreate(){
    const dispatch = useDispatch();
    const tempers = useSelector((state) => state.temperaments);
    const [input , setInput] = useState({
        name : '',
        height: '',
        weight: '',
        life_span: '',
        temper: []
    })

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    return(
        <div>
            <Link to="/home">
                <button>◀ Go back</button>
            </Link>
            <h1>Crea una nueva raza de perro</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input type='text'
                    value={input.name}
                    name='name'
                    />
                </div>
                <br/>
                <div>
                    <label>Height:</label>
                    <input type='text'
                    value={input.height}
                    name='height'
                    />
                </div>
                <br/>
                <div>
                    <label>Weight:</label>
                    <input type='text'
                    value={input.weight}
                    name='weight'
                    />
                </div>
                <br/>
                <div>
                    <label>Life expectancy:</label>
                    <input type='text'
                    value={input.life_span}
                    name='life_span'
                    />
                </div>
                
            </form>
        </div>
    )
}