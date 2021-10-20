const arr1 = [1,2,3,4,5,6];
const arr2 = [1,[1,2,4,6],[2,3,45]]; //for length

const obj1 = {name:'xx',sex:'man'}
const ao = [{name:'xx',sex:'man'},{name:'xxl',sex:'woman'}]//forEach


for (let index = 0; index < arr2.length; index++) {  //0 --> +1 -->index<+1
    const element = arr2[index];
    console.log(element)
}

function con(data){
    console.log(data)
}
arr2.forEach(function (xxx){
    console.log(xxx,'xx')

});

