import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRaces } from "../../actions/actions";
import style from "./css/searchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState('');

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameRaces(name));
        setName('')
    }

    return(
        <header className={style.header}>
            <h3>Dogs-App</h3>
            <form className={style.form}>
            <input className={style.input} type='text'
            placeholder='Search...'
            onChange={(e) => handleInput(e)}
            />
            <button className={style.button} type="submit" 
            onClick={(e) => handleSubmit(e)}>GO</button>
            </form>
            <h3>created by : jv Developer</h3>
        </header>
    )
}