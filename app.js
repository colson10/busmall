'use strict';

ShopItem.allItems = [];
var recentItems = [];
var itemNames = [];
var itemVotes = [];
var itemDisplayCounts = [];
// var accumulatedVoteCounts = [];

var totalClickCount = 0;

var sectionEl = document.getElementById('items-displayed');
var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
var formEl = document.getElementById('form-for-button');
// var resultsSection = document.getElementById('results');
// var bodyEl = document.getElementById('body');

// Constructor
function ShopItem(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.clickCount = 0;
  this.appearCount = 0;
  ShopItem.allItems.push(this);
  itemNames.push(this.name);
  this.percent = 0;
}

// Constructor method returns a percentage of the times an image was clicked vs the times it appeared
ShopItem.prototype.percentClicked = function() {
  return (parseFloat(this.clickCount / this.appearCount) * 100).toFixed(2);
};

// function fillPercentProperty() {
//   for (var i in ShopItem.allItems) {
//     ShopItem.allItems[i].percent = ShopItem.allItems[i].percentClicked();
//   }
// }

// function sorting the objects by percentage clicked and returning an array of the objects in that order. Reorders ShopItem.allItems so it is called last. Will use this to show the top performers.

// function populateOrderByPercent() {
//   ShopItem.allItems.sort(function(a, b) {
//     return (b.percent - a.percent);
//   });
// }

// function to display images of the top performers

// function topPerformersImgs() {
//   var h4topEL = document.createElement('h4');
//   h4topEL.textContent = 'Top Performers:';
//   sectionEl.appendChild(h4topEL);
//   for (var i = 0; i < 3; i++) {
//     var topImg = document.createElement('img');
//     topImg.src = ShopItem.allItems[i].filepath;
//     topImg.alt = ShopItem.allItems[i].name;
//     sectionEl.appendChild(topImg);
//   }
// }

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
  if (totalClickCount > 24) {
    
    sectionEl.removeEventListener('click', handleClick);
    populateItemDisplayCounts();
    populateItemVotes();
    // fillPercentProperty();
    localStorage.setItem('accumulatedVotes', JSON.stringify(ShopItem.allItems));
    localStorage.setItem('names', JSON.stringify(itemNames));
    // displayResults();
    renderChart();
    checkLocalStorage();
    removeImages();
    // populateOrderByPercent();
    // topPerformersImgs();
  } else {
    totalClickCount++;
    displayPics();

  }
}

// event listeners
sectionEl.addEventListener('click', handleClick);
formEl.addEventListener('submit', handleSubmit);

// function for displaying results when totalClickCount reaches 25

// function displayResults() {
//   var h4El = document.createElement('h4');
//   h4El.textContent = 'Results:';
//   resultsSection.appendChild(h4El);
//   var pEl;
//   for (var i = 0; i < ShopItem.allItems.length; i++) {
//     pEl = document.createElement('p');
//     pEl.textContent = 'The ' + ShopItem.allItems[i].name + ' image was selected a total of ' + ShopItem.allItems[i].clickCount + ' out of ' + ShopItem.allItems[i].appearCount + ': ' + ShopItem.allItems[i].percentClicked() + '% of the time it appeared.';
//     resultsSection.appendChild(pEl);
//   }
// }

// function to check if there is currently local storage. If not, it invokes instantiate. If yes, updates object properties.
function checkLocalStorage() {
  if (localStorage.accumulatedVotes) {
    console.log('local storage - yes');
    ShopItem.allItems = JSON.parse(localStorage.accumulatedVotes);
    itemDisplayCounts = JSON.parse(localStorage.accumulatedVotes);
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

checkLocalStorage();