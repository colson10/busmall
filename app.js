'use strict';

ShopItem.allItems = [];
var recentItems = [];
var itemNames = [];
var itemVotes = [];
var itemDisplayCounts = [];
var orderingTopPerformers = [];

var totalClickCount = 0;

var sectionEl = document.getElementById('items-displayed');
var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
var formEl = document.getElementById('form-for-button');
var topPerformersEL = document.getElementById('top-performers');

// Constructor
function ShopItem(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.clickCount = 0;
  this.appearCount = 0;
  this.percent = 0;
  ShopItem.allItems.push(this);
  itemNames.push(this.name);
}

// function that fills the percent property for all items at the end of each round of clicks
function fillPercentProperty() {
  for (var i in ShopItem.allItems) {
    ShopItem.allItems[i].percent = (parseFloat(ShopItem.allItems[i].clickCount / ShopItem.allItems[i].appearCount) * 100).toFixed(2);
  }
}

// function sorting the objects by percentage clicked and returning an array of the objects in that order. Reorders ShopItem.allItems so it is called last. Will use this to show the top performers.

function populateOrderByPercent() {
  orderingTopPerformers = ShopItem.allItems;
  orderingTopPerformers.sort(function(a, b) {
    return (b.percent - a.percent);
  });
}

// function to display images of the top performers

function topPerformersImgs() {
  var divEl = document.createElement('div');
  var h4topEL = document.createElement('h4');
  h4topEL.textContent = 'Top Performers by Percentage Clicked/Shown:';
  topPerformersEL.appendChild(h4topEL);
  for (var i = 0; i < 3; i++) {
    divEl = document.createElement('div');
    var topImg = document.createElement('img');
    var pEl = document.createElement('p');
    topImg.src = orderingTopPerformers[i].filepath;
    topImg.alt = orderingTopPerformers[i].name;
    pEl.textContent = orderingTopPerformers[i].name + ': clicked ' + orderingTopPerformers[i].percent + '%';
    divEl.appendChild(topImg);
    divEl.appendChild(pEl);
    topPerformersEL.appendChild(divEl);
  }
}

// function to determine if a number matches one of the numbers in the array recentItems.
function matchRandom(input) {
  if (input === recentItems[0] || input === recentItems[1] || input === recentItems[2]) {
    return true;
  }
}

// main function for displaying pics based on three random numbers that don't match the previous three pics shown.
function displayPics() {
  do {
    var randomIndex1 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (matchRandom(randomIndex1));
  do {
    var randomIndex2 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex1 === randomIndex2 || matchRandom(randomIndex2));
  do {
    var randomIndex3 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2 || matchRandom(randomIndex3));

  // assign src and alt attributes for the three img elements
  imgEl1.src = ShopItem.allItems[randomIndex1].filepath;
  imgEl1.alt = ShopItem.allItems[randomIndex1].name;
  imgEl2.src = ShopItem.allItems[randomIndex2].filepath;
  imgEl2.alt = ShopItem.allItems[randomIndex2].name;
  imgEl3.src = ShopItem.allItems[randomIndex3].filepath;
  imgEl3.alt = ShopItem.allItems[randomIndex3].name;

  // increment the appearCount for each image that appears
  ShopItem.allItems[randomIndex1].appearCount++;
  ShopItem.allItems[randomIndex2].appearCount++;
  ShopItem.allItems[randomIndex3].appearCount++;

  // push the current random numbers to an array which is then sliced to leave just the most recent random numbers
  recentItems[0] = randomIndex1;
  recentItems[1] = randomIndex2;
  recentItems[2] = randomIndex3;
}
// function that reassigns values in an array with each object's clickCount
function populateItemVotes() {
  for (var i in ShopItem.allItems) {
    itemVotes[i] = ShopItem.allItems[i].clickCount;
  }
}
// function that reassigns values in an array with each object's appearCount
function populateItemDisplayCounts() {
  for (var i in ShopItem.allItems) {
    itemDisplayCounts[i] = ShopItem.allItems[i].appearCount;
  }
}

// hide images after 25 clicks
function removeImages() {
  sectionEl.setAttribute('class', 'hidden');
}

// make a chart with Chart.js to show the clicks and display counts for each item
function renderChart() {
  var context = document.getElementById('results-chart').getContext('2d');
  var itemsChart = new Chart(context, {//eslint-disable-line
    type: 'bar',
    backgroundColor: '#4FD3FF',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Dataset 1: Number of times each item was selected',
        data: itemVotes,
        backgroundColor: '#D34FFF',
      }, {
        label: 'Dataset 2: Number of times each item was displayed',
        data: itemDisplayCounts,
        backgroundColor: '#4FD3FF',
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
          }
        }],
        yAxes: [{
          categoryPercentage: 0.8,
          barPercentage: 1.0,
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

// event handler for the submit button. Updates local storage with clicks/appearances at any point the button is clicked
function handleSubmit(event) {//eslint-disable-line
  populateItemDisplayCounts();
  populateItemVotes();
  localStorage.setItem('accumulatedVotes', JSON.stringify(ShopItem.allItems));
  localStorage.setItem('accumulatedDisplay', JSON.stringify(ShopItem.allItems));
  localStorage.setItem('names', JSON.stringify(itemNames));
  checkLocalStorage();
}

// event handler checking which item in the array of objects matches the target
function handleClick(event) {
  console.log(event.target.alt);
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    if (event.target.alt === ShopItem.allItems[i].name) {
      ShopItem.allItems[i].clickCount++;
    }
  }
  if (totalClickCount > 23) {
    
    sectionEl.removeEventListener('click', handleClick);
    populateItemDisplayCounts();
    populateItemVotes();
    localStorage.setItem('accumulatedVotes', JSON.stringify(ShopItem.allItems));
    localStorage.setItem('accumulatedDisplay', JSON.stringify(ShopItem.allItems));
    localStorage.setItem('names', JSON.stringify(itemNames));
    fillPercentProperty();
    populateOrderByPercent();
    topPerformersImgs();
    renderChart();
    checkLocalStorage();
    removeImages();
  } else {
    totalClickCount++;
    displayPics();

  }
}

// event listeners
sectionEl.addEventListener('click', handleClick);
formEl.addEventListener('submit', handleSubmit);

// function to check if there is currently local storage. If not, it invokes instantiate. If yes, updates object properties.
function checkLocalStorage() {
  if (localStorage.accumulatedVotes) {
    console.log('local storage - yes');
    ShopItem.allItems = JSON.parse(localStorage.accumulatedVotes);
    itemDisplayCounts = JSON.parse(localStorage.accumulatedDisplay);
    itemNames = JSON.parse(localStorage.names);
    console.log(itemNames);
    displayPics();
  } else {
    console.log('local storage - no');
    instantiate();
    displayPics();
  }
}

// function that creates new ShopItem object instances
function instantiate() {
  new ShopItem('img/bag.jpg', 'R2D2 suitcase');
  new ShopItem('img/banana.jpg', 'Banana slicer');
  new ShopItem('img/bathroom.jpg', 'Ipad holding toilet paper roll');
  new ShopItem('img/boots.jpg', 'Open toe boots');
  new ShopItem('img/breakfast.jpg', 'Breakfast machine');
  new ShopItem('img/bubblegum.jpg', 'Meatball bubblegum');
  new ShopItem('img/chair.jpg', 'Chair');
  new ShopItem('img/cthulhu.jpg', 'Cthulhu');
  new ShopItem('img/dog-duck.jpg', 'Duck beak on a dog');
  new ShopItem('img/dragon.jpg', 'Dragon meat');
  new ShopItem('img/pen.jpg', 'Blue silverware pen caps');
  new ShopItem('img/pet-sweep.jpg', 'Pet paw mops');
  new ShopItem('img/scissors.jpg', 'Pizza scissors');
  new ShopItem('img/shark.jpg', 'Shark sleeping bag');
  new ShopItem('img/sweep.png', 'Baby sweeping outfit');
  new ShopItem('img/tauntaun.jpg', 'Tauntaun sleeping bag');
  new ShopItem('img/unicorn.jpg', 'Unicorn meat');
  new ShopItem('img/usb.gif', 'USB lizard tail');
  new ShopItem('img/water-can.jpg', 'Watering can');
  new ShopItem('img/wine-glass.jpg', 'Wine glass');
}

// single function being called to first check if there is local storage
checkLocalStorage();