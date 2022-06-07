import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDogDetail } from "../../redux/actions/creators";
import './DogDetail.css'
//No estaria mal agregar un clearPage

export default function DogDetail(){
const {id} = useParams();
const dispatch = useDispatch();
const guau_guau= useSelector( state => state.dogDetail);
 React.useEffect(()=>{dispatch(getDogDetail(id))},[dispatch,id])
 function Concat(a,b){    // necesitamos unir los temperamentos
    return a+', '+b;       // ya se gano un puesto en funciones que hay importar... sale 3 veces
  }
return(
<div className="div-detail">
Who let the dogs Out?
{guau_guau.name ?
        
          <div className="glass-container">
                
          <img src={guau_guau.image} alt={guau_guau.name} className='img-detail' />
                

          <h4>Name: {guau_guau.name}</h4>
          <div className="div-row-Detail">
          <h4>Height:</h4> { typeof guau_guau.height === 'object'?
            <div><h5>{guau_guau.height.imperial } inch</h5>
           <h5>{guau_guau.height.metric } cm</h5>
           </div>
          : <h5>{guau_guau.height} cm</h5> }


<h4>Weight:</h4> { typeof guau_guau.weight === 'object'?
           <div><h5>{guau_guau.weight.imperial } pound</h5>
           <h5>{guau_guau.weight.metric } kg</h5>
           </div>
          : <h5>{guau_guau.weight} kg</h5> }
                                            
          <h4>Life Span:</h4> {guau_guau.life_span.includes('year')? 
             <h5> {guau_guau.life_span}</h5> :
          <h5>{guau_guau.life_span} years</h5>
          } </div>
        <h4 className='temps-Detail'>Temperaments: {guau_guau.temperament || guau_guau.Temperaments? guau_guau.temperament ||
           guau_guau.Temperaments.map(a=>a.name).reduce(Concat) : 'El que tu quieras, es Adorable <3'}</h4>
                </div>
        :
        (<h1>Loading...</h1>)
      }



</div>


)



}