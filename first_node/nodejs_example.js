function addTwoNumbers(a, b) {
  console.log("We are now executing 'addTwoNumbers' function");
  console.log("Our two parameters are a: " + a + " and b: " + b);
  let newNumber = a + b;
  return newNumber;
}

let three = addTwoNumbers(1, 2);
console.log(three);

console.log(addTwoNumbers(three, 4));

let minusSeven = -7;
let someNumber = addTwoNumbers(minusSeven, three);
console.log(someNumber);
