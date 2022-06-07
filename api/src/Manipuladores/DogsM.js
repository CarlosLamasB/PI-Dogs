const axios = require( 'axios');
const { Dog, Temperament} = require('../db');
const{API_KEY}=process.env;
///Vamos por la ruta principal
module.exports={
//Necesitamos entonces 2 funciones
//Para la API
getAllDogsAPI:async function (req, res, next){

    try{const breed=  await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)// esto me genera un arreglo de razas    
       const breeds = await breed.data;// esto es el arreglo te todas las razas de los perritus    
       //No se quien peso a estos perros, pero lo odio
       
       let perritusIncompletos= await breeds.filter(a=>a.id === 113 || a.id ===128 || a.id === 179 || a.id=== 183|| a.id ===221 || a.id ===232);
       let perritusCompletos= await breeds.filter(a=> a.id !== 113 && a.id !==128 && a.id !== 179 && a.id !== 183 && a.id !== 221 && a.id !==232);    
       
       let perritusAMedias = perritusIncompletos.filter(a=>a.id !== 179 && a.id!== 232);
       perritusAMedias?.forEach(a=>a.weight.metric=`${a.weight.metric-1} - ${a.weight.metric}`);
       let bulldogge= perritusIncompletos?.find(a=>a.id=== 179);
       bulldogge.weight.metric='29 - 39';
       let terrier= perritusIncompletos?.find(a=>a.id ===232);
       
       terrier.weight ={metric:'7 - 8' ,imperial:'15 - 18'}


       let breeds2 =[...perritusAMedias,...perritusCompletos].concat(bulldogge).concat(terrier);

       return breeds2;

         }
                 


catch(error){ next(error)}

},
//Para la base de datos
getAllDogsDB: async function (req, res, next){

try{ razas = await Dog.findAll({attributes:['name', 'weight', 'id'],
include:[{model:Temperament,attributes:['name'],through: {// esto es para que no aparezcan las tablas de por medio, pues al hacer ManytoMany, van a aparecer
    attributes: [],
  } }]})
      return razas;
}

catch(error){next(error)}

},
getAllTemperaments : async function(req,res,next){
 

    try{ razas = await Temperament.findAll()
        return razas;//cabmiar
  }
  
  catch(error){next(error)}
}

}