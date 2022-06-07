import * as Tipos  from  './types';
import axios from 'axios';
//recordemos que estos son action creators

export function casaDePerros(){

return  dispatch => {// ya te async- awaiteo 
return axios.get('http://localhost:3001/dogs')
    .then( res => dispatch({ type: Tipos.GET_ALL_Dogs, 
    payload: res.data}))
   
}

}

export function insideTemperamentsOut(){

    return  dispatch => {// ya te async- awaiteo 
    return axios.get('http://localhost:3001/temperament')
        .then( res => dispatch({ type: Tipos.GET_ALL_Temps, 
        payload: res.data}))
       
    }
    
    }


export function dogsBirth(perro){// este perro es dato del estado 
return dispatch => {
         return axios.post('http://localhost:3001/dog',perro)
         .then( res => dispatch({type: Tipos.POST_DOG, 
            payload: res.data
                }//Nota, este Payload es al pedo 
            )
        )
    }
}
export function getDogDetail(id){
return dispatch=> {
return axios.get(`http://localhost:3001/dogs/${id}`)
.then( res => dispatch({ type: Tipos.GET_DOG_Detail, 
    payload: res.data}))
    
   }


}

export function getDogPerName(name){
return async (dispatch) => {
try{ const respuesta =  await axios.get(`http://localhost:3001/dogs?name=${name}`)
return dispatch({type: Tipos.GET_DOG_Name, payload:respuesta.data })


}

catch(err){ console.log(err)}

}

}

export function FiltroTemps(string){
    return  async dispatch => {// ya te async- awaiteo 
    try{const res = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: Tipos.FILTERbyTemp,
            payload: { p: res.data, t: string }
        });}    
      catch(err){ console.log(err)}     
        }



}