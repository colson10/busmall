'use strict';

ShopItem.allItems = [];
var recentItems = [];
var itemNames = [];
var totalClickCount = 0;
var itemVotes = [];
var itemDisplayCounts = [];

var sectionEl = document.getElementById('items-displayed');
var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
var resultsSection = document.getElementById('results');

// Constructor
function ShopItem(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.clickCount = 0;
  this.appearCount = 0;
  ShopItem.allItems.push(this);
  itemNames.push(this.name);
}

// Constructor method returns a percentage of the times an image was clicked vs the times it appeared
ShopItem.prototype.percentClicked = function() {
  return (parseFloat(this.clickCount / this.appearCount) * 100).toFixed(2) + '%';
};

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
  recentItems.push(randomIndex1, randomIndex2, randomIndex3);
  if (recentItems.length > 3) {
    recentItems = recentItems.slice(3);
  }
}

// event handler checking which item in the array of objects matches the target
function handleClick(event) {
  console.log(event.target.alt);
  console.log(totalClickCount);
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    if (event.target.alt === ShopItem.allItems[i].name) {
      ShopItem.allItems[i].clickCount++;
    }
  }
  if (totalClickCount < 24) {
    totalClickCount++;
    displayPics();
  } else {
    sectionEl.removeEventListener('click', handleClick);
    populateItemDisplayCounts();
    populateItemVotes();
    displayResults();
    renderChart();
    
    // imgEl1.removeEventListener('click', handleClick);
    // imgEl2.removeEventListener('click', handleClick);
    // imgEl3.removeEventListener('click', handleClick);
  }
}

function populateItemVotes() {
  for (var i in ShopItem.allItems) {
    itemVotes[i] = ShopItem.allItems[i].clickCount;
  }
}

function populateItemDisplayCounts() {
  for (var i in ShopItem.allItems) {
    itemDisplayCounts[i] = ShopItem.allItems[i].appearCount;
  }
}

function renderChart() {
  var context = document.getElementById('results-chart').getContext('2d');
  var itemsChart = new Chart(context, {
    type: 'bar',
    data :{
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

// event listeners
sectionEl.addEventListener('click', handleClick);
// imgEl1.addEventListener('click', handleClick);
// imgEl2.addEventListener('click', handleClick);
// imgEl3.addEventListener('click', handleClick);

// function for displaying results when totalClickCount reaches 25
function displayResults() {
  var h4El = document.createElement('h4');
  h4El.textContent = 'Results:';
  resultsSection.appendChild(h4El);
  var pEl;
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    pEl = document.createElement('p');
    pEl.textContent = 'The ' + ShopItem.allItems[i].name + ' image was selected a total of ' + ShopItem.allItems[i].clickCount + ' out of ' + ShopItem.allItems[i].appearCount + ': ' + ShopItem.allItems[i].percentClicked() + ' of the time it appeared.';
    resultsSection.appendChild(pEl);
  }
}

displayPics();