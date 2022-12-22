import React from "react";
import style from './css/card.module.css';

export function Card({name , img , weight , temper }){
    return(
        <div className={style.card}>
            <h3 className={style.name}>{name}</h3>
            <img src={img} alt='img not found'  className={style.img} />
            <h4 className={style.weight}>Weight : <br/> {weight} Kg</h4>
            <h4 className={style.temper}>Temperament : <br/> {temper}</h4>
        </div>
    )
}