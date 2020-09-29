/*let myDiv = document.getElementById('keyboard');
console.log(myDiv.innerText);*/

let eighth = document.getElementById('C4');
console.log(eighth.dataset.notelength);
eighth.dataset.notelength = "2n";
console.log(eighth.dataset.notelength);

let myDiv = document.createElement('div');
/*
function onPlay(id) {
    let buttons = document.querySelectorAll("#keyboard button");
    let clickedButton = id;
        for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText=== clickedButton){
         //let   lastPlayedButton = buttons[i].innerText;
          buttons[i].classlist.add('last-played');

        }

    console.log(id);
  }}
  */
