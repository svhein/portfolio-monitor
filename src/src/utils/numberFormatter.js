const number = (2500).toLocaleString('fi-FI');


const list  = [1,2,3,4];

const reducedList = list.reduce((prev, next) => prev+ next);

console.log(reducedList);