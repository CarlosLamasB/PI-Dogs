const { Router } = require('express');
const {getAllDogsAPI, getAllDogsDB, getAllTemperaments } = require('../Manipuladores/DogsM.js');
const {Temperament,Dog} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req,res,next)=>{/// 
    
    const{name} = req.query;
    
try{ //
    
    let razaAPI= await getAllDogsAPI(req,res,next);
    let razaDB= await getAllDogsDB(res,req,next)// 
    let razaAPIm= razaAPI.map(a=>{return {name:a.name, temp:a.temperament,weight:a.weight, image: a.image.url, id:a.id }})
    

    let todos=[...razaAPIm,...razaDB]
    if(!name){res.send(todos)}
    let todosFiltrados= todos.filter( a=>a.name.includes(name))
if(todosFiltrados.length){ res.send(todosFiltrados)}
res.send(`No encontramos razas con ${name} en su nombre`)    
             }

catch(err){()=>{next(err)}
    
    
}

})

router.get('/dogs/:idRaza', async(req, res,next)=>{//intentemos una estructura de promseas
const {idRaza} =req.params;
console.log(idRaza)
try{if (!isNaN(Number(idRaza))){///horrible, yo se, pero esto indica si idRaza es un numero pero con strings
if(Number(idRaza)<=264 && Number(idRaza)>0){// me van a escupir en el PI, pero 
                      //Busquemos en la API //me echaron  de casa
let razaAPI= await getAllDogsAPI(req,res,next);
let perrito = razaAPI.find(a=>a.id== idRaza);
const{name,temperament,weight,image,height,life_span}= perrito
res.send({name,temperament,weight,image:image.url,height,life_span})// me toca hacer un destructuring, pero primero quiero ver si me fui xD
}else{
res.status(404).send('Tu raza no esta en la API, intenta buscar en la Dase de Batos')
}}
const perrote = await Dog.findOne({where:{id:idRaza}, include:[{model:Temperament,attributes:['name'],through: {
    attributes: [],
  } }]});
    res.send(perrote) }//podemos mejorar esto con findByPk?
    catch(error){()=>next(error)}// por que aqui le tengo que poner una sintaxis diferente?
                                            
})



router.get('/temperament', async (req,res,next)=>{
let temps = await getAllTemperaments()
if (temps.length){res.send(temps)
}
else{
try{
 //necesitamos que aparezcan todos 
let perritus= await getAllDogsAPI(req,res,next);
//ahora hacemos un map de los temperamentos
let tempsAPI= perritus.map(a=>a.temperament);// 
function Concat(a,b){// necesitamos unir los temperamentos
    return a+', '+b;
}                                              
let tempsAPI2= tempsAPI.reduce(Concat).split(',');// esto genera un array con todos los temperamentos
let tempsAPI2_0_1= tempsAPI2.map(a=>a.replace(' ',''));// ahora me di cuenta que todos menos el primero empiezan con espacio xD
let setAPI= new Set(tempsAPI2_0_1);// Tenemos un set para evitar repetidos
let tempsAPI3 = Array.from(setAPI)// Transformamos en Array, 
let tempsAPI4 =tempsAPI3.filter( a=>a !== 'undefined');//me di cuenta que undefined sale xD  
    
 await Promise.all(tempsAPI4.map(a=>Temperament.create({name:`${a}`})));//Llenamos la Dase de Batos
    let tempsAPI5 = tempsAPI4.map(a=>{return{name: `${a}`}});
 
 res.send(tempsAPI5);
}
catch(err){ next(err)}
}
})

router.post('/dog', async(req,res,next)=>{

const{name, height, weight, life_span, temperaments}=req.body/// haremos destructuring?
let temps ;

if (temperaments.includes(',')){//recuerda hacer validacion en el frontend
 temps= temperaments.split(',') // con JS, Carlitos( aunque ya en el back tambien se puede)
}else{ temps= temperaments.split(' ');}
try{const fluffy =  await Dog.create({name,height,weight,life_span})//
await Promise.all(temps.map(a=>Temperament.findOrCreate({where:{name:a}})))// hay que revisar esta vaina
// Ahora hacemos un fiind all para conseguir las instancias de temperamentos

let temps2=  await Temperament.findAll({where:{name: temps}});// que divertido que tome al vector

await Promise.all(temps2.map(a=>fluffy.setTemperaments(a)))// para que funcione el Mixin, necesito un id de temp o la instancia, no al nombre de la unstancia

let fluffy2= await Dog.findOne({where: {id:fluffy.id}, include: Temperament});//el instructor dijo que habia que usarlo en algun sitio xD
res.send(fluffy2)}// ya esta :D, 
catch(error){ next(error)}
})

module.exports = router;
