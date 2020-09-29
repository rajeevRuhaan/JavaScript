let toppings = document.querySelectorAll("#pizza-toppings li");
    /*Go through the Nodes in the toppings variable and set the right innerText*/
    /*......*/
    toppingStr = ['Basilica', 'Tomato', 'Mozzarella', 'Ham' ];
   //for (let i = 0; i < toppingStr.length; i++) {
        toppings[0].innerText = toppingStr[0];
        toppings[1].innerText = toppingStr[1];
        toppings[2].innerText = toppingStr[2];
        toppings[3].innerText = toppingStr[3];  
      
    
    console.log(toppings);

    let paragraph = document.createElement('p');
    paragraph.innerText = 'Hi I am back again';
    toppings[3].innerText = toppingStr[3]+' '+ paragraph.innerText;
    console.log(toppings[3].innerText);