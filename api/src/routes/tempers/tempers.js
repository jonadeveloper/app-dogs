const { Router } = require('express');
const { Race , Temperament } = require('../../db')
const axios = require('axios');

const router = Router();

const getApiData = async() => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    let filterRace = apiUrl.data.filter((race)=> race.weight.metric !== ("NaN") && race.temperament)
    const infoApi = await filterRace.map(e => {
        return {
            id: e.id,
            name: e.name,
            minHeight: e.height.metric.split(" - ")[0],
            maxHeight: e.height.metric.split(" - ")[1],
            minWeight: e.weight.metric.split(" - ")[0],
            maxWeight: e.height.metric.split(" - ")[1],
            life_span: e.life_span,
            img: e.image.url,
            temperament: e.temperament
        }
    })
    return infoApi;
}

router.get('/' , async(req,res,next)=>{
    try {
        const tempersGet = await getApiData()
        const temperament = tempersGet.map(e => e.temperament);
        const temperFrag = temperament.toString().split(",");
        temperFrag.forEach(temp => {
            let i = temp.trim();
            Temperament.findOrCreate({
                where: {name : i }
            })
        });
        const allTempers = await Temperament.findAll();
        res.status(200).send(allTempers);          
    } catch (error) {
        next(error)
    }
});


module.exports = router;