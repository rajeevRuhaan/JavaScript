const links = document.getElementById('json-links');
links.addEventListener('click', handleClick);

function handleClick(event) {
  //  You should start by writing this function.
  //   It is very similar to the queryJSON function in the examples
  /* It should:
    - create a new XMLHttpRequest
    - rewriteContent should be attached to 'load' events for the request
    - you should find out the href attribute for the clicked linked
      (hint, you can access the clicked lin with 'event.target')
    - the request should open a 'GET' request, to the .json file
    - the request should finally be sent by calling '.send()' method
  */
  event.preventDefault();
  let request = new XMLHttpRequest();
  request.addEventListener('load', rewriteContent);
  request.open('GET', '/json/' + event.target.innerText);
  request.send();
}


function rewriteContent() {
  // After you've completed handleClick function,
  // the following line should log the contents of
  // the .json file to the browsers console
  //console.log(this.responseText);

  /*
    Once you see content logged to the console, you can remove
    the console.log command and start completing this function.
    It should:
    - parse the responseText to be a JavaScript object
    - you should change the #name in the document
      to equal the name property found in object
    - you should do the same for #born and born property
    - you should do the same for #link and link property
    - finally, the href attribute of the #link should be
      changed to match the link property of the object

    Once you've completed both of these functions and they
    work as expected, submit this file to the grader to receive points.
    y
    */
    let jsonObj = JSON.parse(this.responseText);
    console.log(jsonObj);
    let name = document.getElementById("name");
    name.innerText = jsonObj.name;
    let born = document.getElementById("born");
    born.innerText = jsonObj.born;
    let link = document.getElementById("link");
    link.innerText = jsonObj.link;
    link.href = jsonObj.link;

}
