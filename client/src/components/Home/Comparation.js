export function heavier(a,b){// esto se deberia poder simplificar
    if (a.weight.metric && b.weight.metric){
let ia=a.weight.metric.indexOf('-');
let ib=b.weight.metric.indexOf('-');
let na= Number(a.weight.metric.substring(ia+2));//dame los numeros a comparar
let nb= Number(b.weight.metric.substring(ib+2));
        if (na> nb) {
            return -1;
          }
          if (na < nb) {
            return 1;
          }
          return 0;
        }
    
    if(!a.weight.metric && b.weight.metric){
        let ia=a.weight.indexOf('-');
        let ib=b.weight.metric.indexOf('-');
        let na= Number(a.weight.substring(ia+1));//dame los numeros a comparar
        let nb= Number(b.weight.metric.substring(ib+2));
                if (na> nb) {
                    return -1;
                  }
                  if (na < nb) {
                    return 1;
                  }
                  return 0;
    }
    if(a.weight.metric && !b.weight.metric){
        let ia=a.weight.metric.indexOf('-');
        let ib=b.weight.indexOf('-');
        let na= Number(a.weight.metric.substring(ia+2));//dame los numeros a comparar
        let nb= Number(b.weight.substring(ib+1));
                if (na> nb) {
                    return -1;
                  }
                  if (na < nb) {
                    return 1;
                  }
                  return 0;
    }
    if(!a.weight.metric && !b.weight.metric){
        let ia=a.weight.indexOf('-');
        let ib=b.weight.indexOf('-');
        let na= Number(a.weight.substring(ia+1));//dame los numeros a comparar
        let nb= Number(b.weight.substring(ib+1));
                if (na> nb) {
                    return -1;
                  }
                  if (na < nb) {
                    return 1;
                  }
                
                  return 0;
      }

    }

    export function lighter(a,b){//esto se puede simplifcar aun mas
let detectNTransform= (x,y)=>{// vemos el tipo de anidacion y devolvemos numeros
    if (x.weight.metric && y.weight.metric){
        let ia=x.weight.metric.indexOf('-');
        let ib=y.weight.metric.indexOf('-');
        let nx= Number(x.weight.metric.substring(0,ia));//dame los numeros a comparar
        let ny= Number(y.weight.metric.substring(0,ib));
        return[nx,ny]
    }

    if (!x.weight.metric && y.weight.metric){
        let ia=x.weight.indexOf('-');
        let ib=y.weight.metric.indexOf('-');
        let nx= Number(x.weight.substring(0,ia));//dame los numeros a comparar
        let ny= Number(y.weight.metric.substring(0,ib));
        return[nx,ny]
    }
    if (x.weight.metric && !y.weight.metric){
        let ia=x.weight.metric.indexOf('-');
        let ib=y.weight.indexOf('-');
        let nx= Number(x.weight.metric.substring(0,ia));//dame los numeros a comparar
        let ny= Number(y.weight.substring(0,ib));
        return[nx,ny]
    }
    if (!x.weight.metric && !y.weight.metric){
        let ia=x.weight.indexOf('-');
        let ib=y.weight.indexOf('-');
        let nx= Number(x.weight.substring(0,ia));//dame los numeros a comparar
        let ny= Number(y.weight.substring(0,ib));
        return[nx,ny]
    }    
}
const minMax=(array)=>{
        if (array[0]> array[1]) {
            return 1;
          }
          if (array[0] <array[1]) {
            return -1;
          }
          return 0;
    }
    let resultado = minMax(detectNTransform(a,b));
    return resultado;
 }   


let substringWeight= (x)=>{
let guion,min,max;
if(x.weight.metric){
guion = x.weight.metric.indexOf('-');
min= Number(x.weight.metric.substring(0,guion));
max= Number(x.weight.metric.substring(guion+2));
return[min,max];

}
else{
  
    guion = x.weight.indexOf('-');
    min= Number(x.weight.substring(0,guion));
    max= Number(x.weight.substring(guion+1));
    return[min,max];

}


}

 export function strongerLighter(a,b){
let arrA= substringWeight(a);
let arrB= substringWeight(b);
let array=[...arrA,...arrB];
if (array[0] > array[2]) {return 1}
else if( array[0] < array[2]){return -1}
else{
 if( array[1]>array[3]){return 1}
if (array[1]< array[3]){return -1}
return 0

   }
 }

 export function strongerHeavier(a,b){
let array = [...substringWeight(a),...substringWeight(b)];
if (array[1] > array[3]) {return -1}
else if( array[1] < array[3]){return 1}
else{
 if( array[0]>array[2]){return -1}
if (array[0]< array[2]){return 1}
return 0

   }



 }