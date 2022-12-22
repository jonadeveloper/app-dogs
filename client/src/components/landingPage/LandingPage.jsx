import React from "react";
import { Link } from "react-router-dom";
import style from './css/landingPage.module.css';
import './css/landingPage.css'

export function LandingPage(){
    return(
        <div>
        <h1 className={style.title}>Welcome to Dogs-App</h1>            
        <Link to='/home'>
            <button className={style.btn}>Get into ▶</button>
        </Link>
            
        </div>
    )
}