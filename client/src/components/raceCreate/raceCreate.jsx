import React , {useState , useEffect} from "react";
import { Link , useHistory } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { getTemperaments , postRace } from "../../actions/actions";
import style from './css/raceCreate.module.css'

const exp = {
    nameExp: /^[A-Za-z\s]*$/,
    numbExp: /^\d+$/,
    lifeExp : /^[0-9]{1,2}(-[0-9]{1,2})?$/,
    urlExp : /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
}

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'breed name is required'
    }else if(!input.name.match(exp.nameExp)){
        errors.name = 'numbers are not allowed'
    }

    if(!input.img){
        errors.img = 'an image is required'
    }else if(!input.img.match(exp.urlExp)){
        errors.img = 'only image url is allowed'
    }

    if(!input.minHeight){
        errors.minHeight = 'you must enter minimum height'
    }else if(!input.minHeight.match(exp.numbExp)){
       errors.minHeight = 'only numbers are allowed'
    }

    if(!input.maxHeight){
        errors.maxHeight = 'you must enter maximum height'
    }else if(!input.maxHeight.match(exp.numbExp)){
       errors.maxHeight = 'only numbers are allowed'
    }else if(input.maxHeight <= input.minHeight){
        errors.maxHeight = "the maximum height must be greater than the minimum"
    }

    if(!input.minWeight){
        errors.minWeight = 'you must enter minimum weight'
    }else if(!input.minWeight.match(exp.numbExp)){
        errors.minWeight = 'only numbers are allowed'
    }

    if(!input.maxWeight){
        errors.maxWeight = 'you must enter maximum weight'
    }else if(!input.maxWeight.match(exp.numbExp)){
        errors.maxWeight = 'only numbers are allowed'
     }else if(input.maxWeight <= input.minWeight){
        errors.maxWeight = "the maximum weight must be greater than the minimum"
    }

    if(!input.life_span){
        errors.life_span = 'you must enter life expectancy'
    }else if(!input.life_span.match(exp.lifeExp)){
        errors.life_span = 'must be entered in this format [12-34] maximum 2 digits per parameter'
    }

    if(!input.temperament){
        errors.temperament = 'at least one temperament is required'
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
        img: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperament: []
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
            temperament: [...input.temperament,e.target.value]
        })
        setErrors(validate({
            ...input,
            temperament : [...input.temperament, e.target.value]
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postRace(input))
        alert('new breed successfully created!!!')
        setInput({
        name : '',
        img: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperament: []
        })
        history.push('/home')
    }

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== e)
        })
    }

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    return(
        <div>
            <div>
            <Link to="/home">
                <button className={style.btn}>◀ Go back</button>
            </Link>
            </div>
            <div className={style.container}>
            <h1 className={style.title}>create a new breed of dog</h1>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <br/>
                    <input type='text'
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    className={errors.name ? style.inputError : style.input}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>image: </label>
                    <br/>
                    <input type='text'
                    value={input.img}
                    name='img'
                    onChange={handleChange}
                    className={errors.img ? style.inputError : style.input}
                    />
                    {errors.img && (
                        <p>{errors.img}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>min-Height: </label>
                    <br/>
                    <input type='text'
                    value={input.minHeight}
                    name='minHeight'
                    onChange={handleChange}
                    className={errors.minHeight ? style.inputError : style.input}
                    />
                    {errors.minHeight && (
                        <p>{errors.minHeight}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>max-Height: </label>
                    <br/>
                    <input type='text'
                    value={input.height}
                    name='maxHeight'
                    onChange={handleChange}
                    className={errors.maxHeight ? style.inputError : style.input}
                    />
                    {errors.maxHeight && (
                        <p>{errors.maxHeight}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>min-Weight: </label>
                    <br/>
                    <input type='text'
                    value={input.weight}
                    name='minWeight'
                    onChange={handleChange}
                    className={errors.minWeight ? style.inputError : style.input}
                    />
                    {errors.minWeight && (
                        <p>{errors.minWeight}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>max-Weight: </label>
                    <br/>
                    <input type='text'
                    value={input.weight}
                    name='maxWeight'
                    onChange={handleChange}
                    className={errors.maxWeight ? style.inputError : style.input}
                    />
                    {errors.maxWeight && (
                        <p>{errors.maxWeight}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Life expectancy: </label>
                    <br/>
                    <input type='text'
                    value={input.life_span}
                    name='life_span'
                    onChange={handleChange}
                    className={errors.life_span ? style.inputError : style.input}
                    />
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                </div>
                <br/>
                <div>
                    <label>Temperaments: </label>
                    <br/>
                    <select onChange={(e)=> handleSelect(e)}>
                    {tempers.map(n =>(
                        <option value={n.name}>{n.name}</option>
                    ))}
                    </select>
                    {errors.temperament && (
                        <p>{errors.tempererament}</p>
                    )}
                </div>
                {input.temperament.map(e => 
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDelete(e)}>X</button>
                </div>
                )}
                <div>
                    <button 
                    className={ 
                        errors.name ? style.btnDis : style.btnCreate && 
                        errors.img ? style.btnDis : style.btnCreate && 
                        errors.minHeight ? style.btnDis : style.btnCreate
                        && errors.maxHeight ? style.btnDis : style.btnCreate
                        && errors.minWeight ? style.btnDis : style.btnCreate
                        && errors.maxWeight ? style.btnDis : style.btnCreate
                        && errors.life_span ? style.btnDis : style.btnCreate
                        && input.temperament.length === 0 ? style.btnDis : style.btnCreate
                    }
                     type="submit"
                    >create</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}