// aqui vamos a poner validaciones
module.exports={  validate: function(input){

let errors = {};
let validateName = (entrada) =>{
    if (!entrada.name) {
        errors.name = 'Name is required';
      }
    if(/\W/.test(entrada.name)||/[0-9]/.test(entrada.name)){
        errors.name='Name only must have letters';
    }
    return errors;

};
let validateTemperaments = (entrada) =>{
    if (!entrada.temperaments) {
        errors.temperaments = 'Temperaments are required';
      }
      if((/\W/.test(entrada.temperaments)||/[0-9]/.test(entrada.temperaments)) && !/,/.test(entrada.temperaments)){
        errors.temperaments='Temperaments only must have letters or ,';
    }
    if (/[0-9]/.test(entrada.temperaments) && entrada.temperaments.includes(',')){
        errors.temperaments='Numbers are not allowed';

    }

    if(/,(?=\s)/.test(entrada.temperaments)){//esto es necedad mia, ya que no quiero que aprezcan comas en mi db
        errors.temperaments=`Don't put any space after the ,`;
    }
 return errors;

};
//funciona, pero hay un sobre-dimensionamiento
let validatenNumber =(entrada) =>{// esta es, por una pagan todos
    let errorNumber={life_span:'', weight:'', height:''}
if (!entrada.life_span || !entrada.weight || !entrada.height){
    for (const propiedad in errorNumber){
        errorNumber[propiedad]= 'This field is required'
    }
    Object.assign(errors,errorNumber);
}
if((!/\d-\d/.test(entrada.life_span)|| !/\d-\d/.test(entrada.weight)||!/\d-\d/.test(entrada.height))|| (/[A-Z]/i.test(entrada.life_span)||/[A-Z]/i.test(entrada.height)||/[A-Z]/i.test(entrada.weight)) ){//esto se puede simplificar on un map
    for (const propiedad in errorNumber){
        errorNumber[propiedad]= 'This field must have this form: number-number'
    }
    Object.assign(errors,errorNumber);
}
let p= [entrada.life_span,entrada.weight,entrada.height];// me canse de tanto or
let val = p.map(a=>(/\W/.test(a) && !/-/.test(a)) ||!/^\d/.test(a)|| !/\d$/.test(a))
if (val.includes(true)){
    for (const propiedad in errorNumber){
        errorNumber[propiedad]= 'This field must start and finnish with numbers, also "-" is necessary'
    }
    Object.assign(errors,errorNumber);
}
let guion= p.map(a=>a.indexOf('-'));
let substraccion = p.map((a,ind)=>[a.substring(0,guion[ind]),a.substring(guion[ind]+1)]);
let substraccion_filtrada= substraccion.filter(a=>Number(a[0])<Number(a[1]));
if( substraccion.length > substraccion_filtrada.length && !val.includes(true)){
    for (const propiedad in errorNumber){
        errorNumber[propiedad]= 'The left number must be smaller than the right number';
    }
    Object.assign(errors,errorNumber);

}
return errors;

};
validateName(input);
validateTemperaments(input);
validatenNumber(input);
return errors;


}}