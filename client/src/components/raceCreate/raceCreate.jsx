import React , {useState , useEffect} from "react";
import { Link , useHistory } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { getTemperaments , postRace } from "../../actions/actions";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'a name is required'
    }
    if(!input.height){
        errors.height = 'a height is required'
    }
    if(!input.weight){
        errors.weight = 'a weight is required'
    }
    if(!input.life_span){
        errors.life_span = 'you must enter life expectancy'
    }
    if(!input.temper){
        errors.temper = 'at least one temperament is required'
    }

    return errors;
}

export default function RaceCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const tempers = useSelector((state) => state.temperaments);
    const [errors,setErrors] = useState({});
    const [input , setInput] = useState({
        name : '',
        height: '',
        weight: '',
        life_span: '',
        temper: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            temper: [...input.temper,e.target.value]
        })
        setErrors(validate({
            ...input,
            temper : [...input.temper, e.target.value]
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postRace(input))
        alert('new breed successfully created!!!')
        setInput({
        name : '',
        height: '',
        weight: '',
        life_span: '',
        temper: []
        })
        history.push('/home')
    }

    function handleDelete(e){
        setInput({
            ...input,
            temper: input.temper.filter(tem => tem !== e)
        })
    }

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    return(
        <div>
            <div>
            <Link to="/home">
                <button>◀ Go back</button>
            </Link>
            </div>
            <div>
            <h1>Crea una nueva raza de perro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type='text'
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Height:</label>
                    <input type='text'
                    value={input.height}
                    name='height'
                    onChange={handleChange}
                    />
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Weight:</label>
                    <input type='text'
                    value={input.weight}
                    name='weight'
                    onChange={handleChange}
                    />
                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Life expectancy:</label>
                    <input type='text'
                    value={input.life_span}
                    name='life_span'
                    onChange={handleChange}
                    />
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Temperaments:</label>
                    <select onChange={(e)=> handleSelect(e)}>
                    {tempers.map(n =>(
                        <option value={n.name}>{n.name}</option>
                    ))}
                    </select>
                    {errors.temper && (
                        <p>{errors.temper}</p>
                    )}
                </div>
                {input.temper.map(e => 
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDelete(e)}>X</button>
                </div>
                )}
                <div>
                    <button type="submit">crear</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}