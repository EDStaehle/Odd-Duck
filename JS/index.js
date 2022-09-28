'use strict';

let votesLeft = 25;
let prodArray = [];


let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');





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

let ranNum = [];
function renderImgs() {
  while (ranNum.length < 6) {
    let imgRend = randomIndex();
    if (!ranNum.includes(imgRend)) {
      ranNum.push(imgRend);
    }
  }
  let imgOneI = ranNum.shift();
  let imgTwoI = ranNum.shift();
  let imgThreeI = ranNum.shift();

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



  for (let i = 0; i < prodArray.length; i++) {
    if (prodArray[i].name === imgClicked) {

      prodArray[i].clicks++;
      break;
    }
  }

  votesLeft--;

  if (votesLeft === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
    let strinifigedProd = JSON.stringify(prodArray);
    localStorage.setItem('myProd', strinifigedProd);

  } else {
    renderImgs();
  }
}
let canvasChart = document.getElementById('myChart').getContext('2d');
const gradientView = canvasChart.createLinearGradient(0, 0, 0, 400);
gradientView.addColorStop(0.3, 'rgba(131,58,180,.7)');
gradientView.addColorStop(.6, 'rgba(233,23,23,.7)');
gradientView.addColorStop(.9, 'rgba(252,176,69,.7)');
const gradientClick = canvasChart.createLinearGradient(0, 0, 0, 400);
gradientClick.addColorStop(.14, 'rgba(252,0,0,.7)');
gradientClick.addColorStop(.28, 'rgba(70,4,53,.7)');
gradientClick.addColorStop(.42, 'rgba(15,121,9,.7)');
gradientClick.addColorStop(.56, 'rgba(8,34,138,.7)');
gradientClick.addColorStop(.70, 'rgba(5,179,166,.7)');
gradientClick.addColorStop(.84, 'rgba(222,117,2,.7)');
gradientClick.addColorStop(.98, 'rgba(0,212,255,.7)');
function renderChart() {
  let prodNames = [];
  let prodLikes = [];
  let prodViews = [];
  for (let i = 0; i < prodArray.length; i++) {
    prodNames.push(prodArray[i].name);
    prodLikes.push(prodArray[i].clicks);
    prodViews.push(prodArray[i].views);
  }


  const data = {
    labels: prodNames,
    datasets: [{
      label: 'Votes',
      data: prodLikes,
      backgroundColor: gradientClick,
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: prodViews,
      backgroundColor: gradientView,
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  // eslint-disable-next-line no-unused-vars, no-undef
  const myChart = new Chart(canvasChart, config);
}
let retreivedProd = localStorage.getItem('myProd');
console.log(retreivedProd);
let parsedProd = JSON.parse(retreivedProd);

if (retreivedProd) {
  for (let i = 0; i < parsedProd.length; i++) {
    if (parsedProd[i].name === 'sweep') {
      let reconstructedProdSweep = new Product(parsedProd[i].name, 'png');
      reconstructedProdSweep.views = parsedProd[i].views;
      reconstructedProdSweep.clicks = parsedProd[i].clicks;
    } else {
      let reconstructedProd = new Product(parsedProd[i].name);
      reconstructedProd.views = parsedProd[i].views;
      reconstructedProd.clicks = parsedProd[i].clicks;
    }
  }
} else {
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
}


renderImgs();
imgContainer.addEventListener('click', handleClick);


