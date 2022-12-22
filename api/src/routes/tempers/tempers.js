const { Router } = require('express');
const { Race , Temper } = require('../../db')
const axios = require('axios');

const router = Router();

router.get('/' , async(req,res)=>{
    try {
        const tempersGet = await axios.get('https://api.thedogapi.com/v1/breeds')
        const temper = tempersGet.data.map(e => e.temperament);
        const temperFrag = temper.toString().split(",");
        temperFrag.forEach(e => {
            Temper.findOrCreate({
                where: {name : e}
            })
        });
        const allTempers = await Temper.findAll();
        res.status(200).send(allTempers);          
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;