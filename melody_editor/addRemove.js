/*
let button = document.getElementById('addLi');
let ul = document.getElementById('uList');

let makeLi = document.createElement('li');
let makeText = document.createTextNode('Two');

button.addEventListener('click', function(){
    ul.appendChild(makeLi).appendChild(makeText);
})*/

//let className = document.createTextNode('mute');
//myDiv.appendChild(className);

//document.body.appendChild(myDiv);
//let editorArea = document.getElementById('editor-area');
function createNoteToEdit(note) {

let noteContainer = document.createElement('div');
    noteContainer.setAttribute('class','note-container');
    document.body.append(noteContainer);

let buttonUp = document.createElement('button');
    buttonUp.className = 'transpose-up';
    buttonUp.innerText = '^';

let newLine = document.createElement('br');

let input = document.createElement('input');
    input.type = 'text';
    input.className = 'note';
    input.size = '2';
    input.setAttribute('value', note);

let select = document.createElement('select');
    select.setAttribute('class', 'note-length');

let option8 = document.createElement('option');
    option8.setAttribute('value', '8');
    option8.innerHTML = 'eighth note';

let option4 = document.createElement('option');
    option4.setAttribute('value', '4');
    option4.innerHTML = 'quater note';

let option2 = document.createElement('option');
    option2.setAttribute('value', '2');
    option2.innerHTML = 'half note';

let option1 = document.createElement('option');
    option1.setAttribute('value', '1');
    option1.innerHTML = 'whole note';

let buttonDown = document.createElement('button');
    buttonDown.className = 'transpose-down';
    buttonDown.innerText = 'v';



let container = document.querySelector('.note-container');
    container.append(buttonUp, newLine, input, 
    select, newLine, buttonDown);

let noteLength = document.querySelector('.note-length');
noteLength.append(option8, option4, option2,option1);

    return container;
}

createNoteToEdit('C4');






    