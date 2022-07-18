let li = [
    {
        price: 6,
        amount: 1
    },

    {
        price: 2,
        amount: 2
    }
]
console.log('foo')

function test(list){
    let sum = 0;
    for (let i = 0; i < list.length; i++){
        console.log(i)
        sum = sum + list[i].price * list[i].amount
    }
    return sum;
}

console.log(test(li))
