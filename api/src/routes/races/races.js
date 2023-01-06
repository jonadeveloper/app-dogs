const { Router } = require('express');
const { Race , Temper } = require('../../db')
const axios = require('axios');

const router = Router();


const getApiData = async() => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const infoApi = await apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            minHeight: e.height.metric.split(" - ")[0],
            maxHeight: e.height.metric.split(" - ")[1],
            minWeight: e.weight.metric.split(" - ")[0],
            maxWeight: e.height.metric.split(" - ")[1],
            life_span: e.life_span,
            img: e.image.url,
            temper: e.temperament
        }
    })
    return infoApi;
}

const getDbData = async () => {
    return await Race.findAll({
        include: {
            model: Temper,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllRace = async () => {
    const apiData = await getApiData();
    const apiDb = await getDbData();
    const totalData = apiData.concat(apiDb);
    return totalData;
}

router.get('/' , async (req,res) =>{
    try {    
        const name = req.query.name;
        const raceTotal = await getAllRace();
        if(name){
            let raceName = await raceTotal.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
            raceName.length ?
            res.status(200).send(raceName):
            res.status(404).send('raza inexistente')
        }else{
            res.status(200).send(raceTotal);
        }
    } catch (error) {
        console.log(error)
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
    try {       
        let {
        name,
        height,
        weight,
        img,
        life_span,
        createInDb,
        temper} = req.body;
    
        let raceCreated = await Race.create ({
            name,
            height,
            weight,
            img,
            life_span,
            createInDb
        })
    
        let temperDb = await Temper.findAll({
            where: { name : temper}
        })
    
        raceCreated.addTempers(temperDb)
        res.status(200).send('Nueva raza creada')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;