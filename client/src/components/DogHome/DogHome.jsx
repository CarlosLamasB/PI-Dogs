import React from "react";
import { Link } from "react-router-dom";
export default function DogHome(props){
const {imperial,metric}= props.weight
function Concat(a,b){    // necesitamos unir los temperamentos
  return a+', '+b;       // ya se gano un puesto en funciones que hay importar... sale 3 veces
}
return(
    <div>
    <img src={props.image} alt="" />
    <h3>{props.name}</h3>
    <h3>{props.temps}</h3>
{props.Temperaments? <h3>{props.Temperaments.map(a=>a.name).reduce(Concat)}</h3>: ''}
    {
    imperial && metric? <div><h3>{`${imperial} pound` }</h3>
   <h3>{`${metric} kg`}</h3></div> : <h3> {props.weight}</h3>
  }
<Link to={`/dog/${props.id}`}>Mas Info</Link>

</div>


)


}