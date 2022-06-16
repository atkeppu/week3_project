import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}
function initializeCode() {
  for (let i = 0; i < 5; i++) {  
    loadImage()
  }
}

async function loadImage()
{
  let url ="https://dog.ceo/api/breeds/image/random";
  let response = await fetch(url);
 // console.log(response);
  let images = await response.json();
 // console.log(images.message);
  //https://images.dog.ceo/breeds/buhund-norwegian/hakon2.jpg
  // https://images.dog.ceo/breeds/terrier-cairn/n02096177_2913.jpg
  // parsi tuosta tuo  buhund-norwegian tahi terrier-cairn

  let arr = images.message.split('/');
  
  // Otetaan toiseksi viimeisin
  var count = arr.length;
 // console.log(count);
  let breed = arr[count-2];
  //console.log(breed);

  // https://en.wikipedia.org/api/rest_v1/page/summary/Otterhound
  let url2 ="https://en.wikipedia.org/api/rest_v1/page/summary/" +breed;
  //console.log(url2);
  let response2 = await fetch(url2);
  console.log(response2.status);
  //console.log(response2);
  var wikitext = "";
  if(response2.status == 200)
  {
    let images2 = await response2.json();
    console.log(images2.extract);
    wikitext = images2.extract
  }
  else
  {
    console.log('EI HAETTU');
    wikitext = "Ei löytynyt";
  }

  addElement(images.message,breed,wikitext);
}



function addElement(imageSrc,breed,wikitext) 
{
 // let newLI = document.createElement("li");
  const newDiv = document.createElement("div");
  newDiv.className = 'wiki-item'; // div.classList.add("myDiv")
  const newH1 = document.createElement("h1");
  newH1.className = 'wiki-header';
  // and give it some content
  const newContent = document.createTextNode(breed);
  // add the text node to the newly created h1
  newH1.appendChild(newContent);
  newDiv.appendChild(newH1);

  const newDiv2 = document.createElement("div");
  newDiv2.className = 'wiki-content'; 
  newDiv.appendChild(newDiv2);

  const newDiv3 = document.createElement("p");
  newDiv3.className = 'wiki-text'; 
  const newContent2 = document.createTextNode(wikitext);
  newDiv3.appendChild(newContent2);
  newDiv2.appendChild(newDiv3);

  const newDiv4 = document.createElement("div");
  newDiv4.className = 'img-container'; 
  const newDiv5 = document.createElement("img");
  newDiv5.className = 'wiki-img'; newDiv5.setAttribute('src',imageSrc);
  newDiv4.appendChild(newDiv5);
  newDiv2.appendChild(newDiv4);

/*
  // create a new div element
  const newDiv = document.createElement("div");
  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");
  // add the text node to the newly created div
  newDiv.appendChild(newContent);
  */
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("container");
  currentDiv.appendChild(newDiv);
  //document.body.appendChild(newDiv, currentDiv);
  //newLI.appendChild(newDiv);
 // document.body.insertBefore(newLI, currentDiv);
 
}