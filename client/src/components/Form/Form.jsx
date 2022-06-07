import React from "react";
import { useDispatch } from "react-redux";
import { dogsBirth } from "../../redux/actions/creators";

import './Form.css'
const {validate}= require("./validations");
export default function Form(){
// el chiste del formulario es manipular los estados
const [perro, setPerro]= React.useState({name:'',temperaments: '', weight:'', height:'', 
life_span:''});
const[errors, setErrors]= React.useState({})// para las validaciones
const dispatch = useDispatch();
//definimos handleSubmit y handleChange
function handleChange(event) {
 
  
    setPerro( {...perro, [event.target.name]: event.target.value});
    setErrors(validate({
    ...perro,
    [event.target.name]: event.target.value
 })); //esto es para los errores-->toca prestar atencion a cada examen de validacion
console.log(errors)   
}
   function handleSubmit(e) {
    e.preventDefault();// para que era esto?
  dispatch(dogsBirth(perro))
 
  }
return (
    <div className="div">
    <div className="div1">  Hola</div>
    <div className="div2"> Gracias por Venir :)</div>
  <form className='form'onSubmit={handleSubmit}>

 
 <div className="div-form">  
<label className="label-form"> Name:</label>
<input className={errors.name ? 'danger' : 'input-form'} 
type="text" name='name' 
value={perro['name']} 
onChange={handleChange}/>
 {errors.name && (
      <p className="danger">{errors.name}</p>
    )}
</div>


<div className="div-form">
<label className="label-form"> Temperaments:</label>
<input className={errors.temperaments? 'danger': 'input-form'} 
type="text" name='temperaments'
value={perro['temperaments']} 
onChange={handleChange}/>
{errors.temperaments && (
      <p className="danger">{errors.temperaments}</p>
    )}
</div>


<div className="div-form">
<label className="label-form"> Weight:</label>
<input className={errors.weight?'danger' : 'input-form'}  
type="text" name='weight'
value={perro['weight']} 
onChange={handleChange}/>
{errors.weight && (
      <p className="danger">{errors.weight}</p>
    )}
</div>

<div className="div-form">
<label className="label-form"> Height:</label>
<input className={errors.height ? 'danger' : 'input-form'}  
type="text" name='height'
value={perro['height']} 
onChange={handleChange}/>
{errors.height && (
      <p className="danger">{errors.height}</p>
    )}
</div>

 <div className="div-form">
<label className="label-form"> Life Span:</label>
<input className={errors.life_span? 'danger': 'input-form'}  
type="text" name='life_span' 
value={perro['life_span']} 
onChange={handleChange}/>
{errors.life_span && (
      <p className="danger">{errors.life_span}</p>
    )}
</div>

<button type ="submit" className="button-form"
disabled={!(!Object.entries(errors).length &&perro.name !== '' )}//Explicacion:
//un formulario tiene 3 estados: vacio y sin errores, rellenandose con errores y 
// relleno y sin errores. Cuando no tenga errores es la primera parte del And y
// el otro lado es cuando un campo este lleno. Porque al llenar solo un campo, 
// los errores estaran presentes (vacio). //Finalmente, el ! al inicio es para decir: 
// Mientras No pase el tercer estado, desactivame esto

> Create Dog</button>

    </form>
</div>
  )
}
