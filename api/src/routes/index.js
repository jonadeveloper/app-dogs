const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const races = require('./races/races');
const tempers = require('./tempers/tempers')


const router = Router();

router.get('/', (req,res)=>{
    res.status(200).send('Estamos en la landing-page');
});
router.use('/races', races);
router.use('/tempers', tempers)




module.exports = router;
