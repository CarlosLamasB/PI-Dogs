import * as Tipos from '../actions/types';


let estadoInicial ={
razas:[],
dogDetail:{},
temps:[]
}

export default function rootReducer(state = estadoInicial, {type, payload}){

switch(type){
 case Tipos.GET_ALL_Dogs:
     return {...state,razas: payload};
case Tipos.GET_ALL_Temps:
     return {...state,temps: payload}

case Tipos.POST_DOG:
 
return state;

case Tipos.GET_DOG_Detail:

return{...state,dogDetail: payload};

case Tipos.GET_DOG_Name:

return{...state, razas:payload};
case Tipos.FILTERbyTemp:
///Aqui vamos a realizar el filtro que salga
const{p,t}= payload
let f=[];
if(t=== '????'){p.forEach(a=> !a.temp && !a.Temperaments && f.push(a))}
else{
if (t === 'All'){ p.forEach(a=>a && f.push(a) )}
else{ f= p.filter( a=> (a.temp && a.temp.includes(t)) || ( a.Temperaments && !!a.Temperaments.find(a=>a.name===t)))}
}
//let f= p.filter( a=> (a.temp && a.temp.includes(t)) || ( a.Temperaments && !!a.Temperaments.find(a=>a.name===t)))

return{...state,razas: f}

default: return state;



}





}