import React from "react";
import style from './css/card.module.css';

export function Card({name , img , minWeight , temperament }){
    return(
        <div className={style.card}>
            <h3 className={style.name}>{name}</h3>
            <img src={img} alt='img not found'  className={style.img} />
            <h4 className={style.weight}>Weight : <br/> {minWeight} Kg</h4>
            <h4 className={style.temper}>Temperament : <br/> {temperament}</h4>
        </div>
    )
}