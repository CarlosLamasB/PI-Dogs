export function Selector(el,aguja,array,set){
  if (set ===true ){
   if (!aguja) return true;
   let r= array.find(a=>a.name===aguja)
   if (!r) {return false;}
   else{
if (el.temp.includes(`${aguja}`) ||  !! el.Temperament.find(a=>a.name=== aguja)) return true;
return true
  }} 
}