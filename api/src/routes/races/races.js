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

const getDbData = async () => {
    let raceDb = await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return raceDb.map(e =>({
        id: e.id,
        name: e.name,
        minHeight: e.minHeight,
        maxHeight: e.maxHeight,
        minWeight: e.minWeight,
        maxWeight: e.maxWeight,
        life_span: e.life_span,
        img: e.img,
        temperament: e.temperaments.map(t => t.name).join(", "),
    }))
}

const getAllRace = async () => {
    const apiData = await getApiData();
    const apiDb = await getDbData();
    const totalData = apiData.concat(apiDb);
    return totalData;
}

router.get('/' , async (req,res,next) =>{
    const name = req.query.name;
    const raceTotal = await getAllRace();
    const keys = ["name"]
    try {    
        if(name){
            let raceName = await raceTotal.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
            raceName.length ?
            res.status(200).send(raceName):
            res.status(404).send('raza inexistente')
        }else{
            res.status(200).send(raceTotal);
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id' , async (req,res)=>{
    const {id} = req.params;
    const racesTotal = await getAllRace();
    if(id){
        let raceId = await racesTotal.filter(e => e.id == id)
        raceId.length?
        res.status(200).json(raceId) :
        res.status(404).send('Lo siento, no encontre esa raza de perro')
    }

})

router.post('/' , async (req,res) =>{
    const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    img,
    life_span,
    createInDb,
    temperament} = req.body;
    try {       
    
        let raceCreated = await Race.create ({
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            img,
            life_span,
            createInDb
        })
    
        let temperamentDb = await Temperament.findAll({
            where: { name : temperament}
        })
    
        raceCreated.addTemperament(temperamentDb)
        res.status(200).send('Nueva raza creada')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;