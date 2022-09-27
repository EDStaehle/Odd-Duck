'use strict';

let votesLeft = 25;
let prodArray = [];


let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  prodArray.push(this);
}

function randomIndex() {
  return Math.floor(Math.random() * prodArray.length);
}


function renderImgs() {
  let imgOneI = randomIndex();
  let imgTwoI = randomIndex();
  let imgThreeI = randomIndex();

  while (imgOneI === imgTwoI || imgTwoI === imgThreeI || imgOneI === imgThreeI) {
    imgTwoI = randomIndex();
    imgThreeI = randomIndex();
  }

  imgOne.src = prodArray[imgOneI].img;
  imgTwo.src = prodArray[imgTwoI].img;
  imgThree.src = prodArray[imgThreeI].img;

  prodArray[imgOneI].views++;
  prodArray[imgTwoI].views++;
  prodArray[imgThreeI].views++;

  imgOne.alt = prodArray[imgOneI].name;
  imgTwo.alt = prodArray[imgTwoI].name;
  imgThree.alt = prodArray[imgThreeI].name;
}

function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;


  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < prodArray.length; i++) {
    if (prodArray[i].name === imgClicked) {

      prodArray[i].clicks++;
    }
  }

  votesLeft--;

  renderImgs();

  if (votesLeft === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {

  if (votesLeft === 0) {
    for (let i = 0; i < prodArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.innerHTML = `<span class='nameOfImg'>${prodArray[i].name}</span><br><span class='views'>viewed: ${prodArray[i].views}</span> times<span class='clicks'> clicked: ${prodArray[i].clicks}</span> times`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

