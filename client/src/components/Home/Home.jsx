import React from "react";
import { casaDePerros, getDogPerName, insideTemperamentsOut,FiltroTemps } from "../../redux/actions/creators";
import {useDispatch, useSelector} from 'react-redux';
import DogHome from '../DogHome/DogHome.jsx'
const {heavier,lighter, strongerLighter,strongerHeavier} = require('./Comparation')

export default function Home(){
const dispatch = useDispatch();


const razas= useSelector(state=> state.razas);

const temps = useSelector(state=> state.temps);

// aqui es donde vamos a hacer el resto de tonteras

React.useEffect(()=>{ dispatch(casaDePerros());dispatch(insideTemperamentsOut())},[dispatch]);  

///SORTING u ORDENAMIENTO

const [sortState, setSortState] = React.useState("none");
  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: (a,b)=> (a.name > b.name ? 1 : -1) },
    descending: { method: (a, b) => (a.name > b.name ? -1 : 1) },
    heavier:{ method: (a,b)=> heavier(a,b)},
    lighter:{ method: (a,b) => lighter(a,b)},
    strongerLighter: {method: (a,b)=> strongerLighter(a,b)},
    strongerHeavier: {method: (a,b)=> strongerHeavier(a,b)}
  };
//FILTRADOS API y Database
const[filt,setFilt] = React.useState('none');
const filtMethods ={
none:{ method: (a)=> a},
API: { method: (a)=> !isNaN(a.id) === true},
Database: {method: (a)=>typeof a.id === 'string'},
All: {method: (a)=> a}
}
//FILTRADO TEMPERAMENTS

//FILTRADO TEMPERAMENTS v2 (por selector)
//let tempurizado=temps.map(a=>a.name);

//console.log(tempurizado)

let options= temps.map((a,i)=> <option key={i} value={`${a.name}`}>{`${a.name}`}</option>)
//let filtMethods2={}
//temps.forEach( a=>filtMethods2[a.name] = {method: b=>b.temperament.includes(`Keen`) || !! b.Temperament.find(c=>c.name === `Keen`)})

//filtMethods2['none']={ method: (a)=> a}
//filtMethods2['All']={ method: (a)=> a}
//const[filt3,setFilt3] = React.useState('none');
function gimme(e){
e.preventDefault();
console.log(e.target.value)
dispatch(FiltroTemps(e.target.value));

  
}

//  BUSQUEDA POR NOMBRE 
const[name, setName] =React.useState('');
function handleChange(e){
  setName(preName =>
    e.target.value
 );
}
function handleSubmit(e){
  e.preventDefault();
  dispatch(getDogPerName(name))


}

//vayamos con el Paginado, 
   //nos basaremos en la alternativa de Piotr Beredecki, haremos uso del estado

//Paso 1, ordenando a las razas
   const [pageCurrent,setPagC] = React.useState(1);

  let dogsPerPage=8;
function handleClick(event) {// necesitamos una funcion para ir alterando las cosas
    setPagC(
      pageCurrent => Number(event.target.id)
    )
 
  };
//necesitamos que unos pocos elementos aparezcan de todas las razas
  let indiceFinal = pageCurrent * dogsPerPage;
  let indiceInicial = indiceFinal - dogsPerPage;
  let message;
  if (typeof razas === 'string'){ message =razas}
  let razasActuales = typeof razas !== 'string' && razas?.sort(sortMethods[sortState].method).filter(filtMethods[filt].method).slice(indiceInicial, indiceFinal);
// el slice es para que aprezcan los objetitos que yo deseo
// el indiceFinal es para que muestren hasta cierto elemento(el cual es la cantidad de paginas por perros en ese instante) 
// el indice inicial es necesario, pues asi nos aseguramos que se muestren la cantidad de razas (8) en esta pagina
let razasRenderizadas =typeof razas !== 'string' && razasActuales?.map(can => <DogHome
    id={can.id}
    key={can.id}
    name={can.name}
    weight={can.weight}
    temps={can.temp}
    image={can.image}
    Temperaments={can.Temperaments}
    />);// aqui ya vamos a mapear cada elemento, DogHome para todos 
   
   /// Paso 2, Mostremos las paginas y el numero de cada una de ellas
   let pageNumbers = [];
   for (let i = 1; i <= Math.ceil(razas.length / dogsPerPage); i++) {
     pageNumbers.push(i);
   }// el ceil es para aproximar por exceso, asi nos aseguramos de no excluir razas
   // cuando su cantidad sea distinta de 0 modulo 8( cuando no sea divisible)
   let numerosRenderizados = pageNumbers.map(number => {
    return (//Pues aqui mostramos los numeros. Deberiamos usar botones
      <button
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </button>
    );
  });
   //Paso 3... si bien la paginacion funciona, no es comodo para el usuario
   // ver tantos botones de paginas. Optimizaremos esto con botones de Prev y Next
   // usando Academind como referencia


const[paginado, setPaginado] = React.useState(0);
let pageLimit =10;/// porque si, vamos de 10 en 10 
//Definamos dos funciones mas, prev y next
function prevPage(){
  setPagC(
    pageCurrent =>{
      if(pageCurrent>1){
        return pageCurrent-1;
      } return 1;

    }
  );
  setPaginado( paginado =>{if (pageCurrent>1){
 return Math.floor((pageCurrent-2) / pageLimit)
  } return 0;
 }   
 )
  
};
function nextPage(){
  setPagC(
    pageCurrent =>{if(pageCurrent<pageNumbers.length){
      return pageCurrent+1
    }
      return pageNumbers.length; 
     }
  )
  setPaginado( paginado => Math.floor((pageCurrent) / pageLimit))
};
//Ademas, necesitamos algo para mostrar solamente los puntos (botones deseados)
// que representan nuestras paginas de razas
 //Hagamos el slice de los puntos (es que de lo contrario estaria pegando nomas)
let sliceOfnumerosRederizados= numerosRenderizados.slice((pageLimit*paginado),(pageLimit*(paginado+1)));
//paso 4, renderizar los botones correspondientes.. y ya seria todo

   return(
<div style={{position:"absolute", height:'100%', width:'100%' , top:'20%'}} >
{razasRenderizadas || message? <div> 
<select defaultValue={'DEFAULT'}
 onChange={(e) => setSortState(e.target.value)
 }>
        <option value="DEFAULT" disabled>None</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
        <option value="heavier">Heavier</option>
        <option value="lighter">Lighter</option>
        <option value="strongerLighter">XS</option>
        <option value="strongerHeavier">XL</option>
      </select>


      <select
   
      onChange={(e) => {
      setFilt(e.target.value);
       }}
       >
        <option value="DEFAULT" disabled>None</option>
        <option value="API">API</option>
        <option value="Database">Database</option>
        <option value="All">All</option>
        </select>


<select name="Tempera" id="" onChange={(e) => {
      gimme(e);
       }}>
<option value="DEFAULT" disabled>None</option>
{temps && options}
<option value="All">All</option>
<option value='????'>????</option>
</select>



      <form  onSubmit={(e)=>handleSubmit(e)} >
      <input
        type="text"
        placeholder="Perro..."
        value = {name}
        onChange={(e)=>handleChange(e)}
      />
      <input type="submit" value="Buscar"    />
    </form>



<ul>
          { razasRenderizadas ||  <h5> {message} </h5> }{/*Hay que usar rendering condicional */}
 
       </ul>
    
   {sliceOfnumerosRederizados}

<button onClick={prevPage}> Prev</button>
<button onClick={nextPage}> Next</button></div>
: <h5>... Loading</h5>}
</div> 

    ) 
};// se puede simplificar esto aun mas unificando next y prev en una
// funcion llamada throughPage .filter(a=> Selector(a,filt2,temps))
