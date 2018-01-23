'use strict';

// Make array to store objects
ShopItem.allItems = [];
var recentItems = [];
var totalClickCount = 0;
// Make variable to access img elements by id

var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
var resultsSection = document.getElementById('results');


// Make Constructor Function

function ShopItem(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.clickCount = 0;
  this.appearCount = 0;
  ShopItem.allItems.push(this);
}

ShopItem.prototype.percentClicked = function() {
  return this.clickCount / this.appearCount;
};

// Make instances of the objects with file paths and names

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

// Make event listener

// callback function in event listener to display three random images when an image is clicked. 

function displayResults() {
  var pEl;
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    pEl = document.createElement('p');
    pEl.textContent = 'The ' + ShopItem.allItems[i].name + ' image was selected a total of ' + ShopItem.allItems[i].clickCount + ' times.';
    console.log(pEl.textContent);
    resultsSection.appendChild(pEl);
  }
}

function matchRandom(input) {
  if (input === recentItems[0] || input === recentItems[1] || input === recentItems[2]) {
    return true;
  }
}

function displayPics() {
  // I need to keep track of clicks.
  // I need 3 different random numbers.
  // I need the random numbers to be different than last time

  do {
    var randomIndex1 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (matchRandom(randomIndex1));
  
  do {
    var randomIndex2 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex1 === randomIndex2 || matchRandom(randomIndex2));

  do {
    var randomIndex3 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2 || matchRandom(randomIndex3));

  imgEl1.src = ShopItem.allItems[randomIndex1].filepath;
  imgEl1.alt = ShopItem.allItems[randomIndex1].name;
  imgEl2.src = ShopItem.allItems[randomIndex2].filepath;
  imgEl2.alt = ShopItem.allItems[randomIndex2].name;
  imgEl3.src = ShopItem.allItems[randomIndex3].filepath;
  imgEl3.alt = ShopItem.allItems[randomIndex3].name;

  ShopItem.allItems[randomIndex1].appearCount++;
  ShopItem.allItems[randomIndex2].appearCount++;
  ShopItem.allItems[randomIndex3].appearCount++;

  recentItems.push(randomIndex1, randomIndex2, randomIndex3);
  if (recentItems.length > 3) {
    recentItems = recentItems.slice(3);
  }
  console.log(recentItems);
}

function handleClick(event) {
  totalClickCount++;
  console.log(totalClickCount);
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    if (event.target.src.slice(48) === ShopItem.allItems[i].filepath) {
      ShopItem.allItems[i].clickCount++;
    }
  }
  if (totalClickCount < 25) {
    displayPics();
  } else {
    displayResults();
  }
}

imgEl1.addEventListener('click', handleClick);
imgEl2.addEventListener('click', handleClick);
imgEl3.addEventListener('click', handleClick);

displayPics();