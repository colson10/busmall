'use strict';

// Make array to store objects
ShopItem.allItems = [];
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
  ShopItem.allItems.push(this);
}

// Make instances of the objects with file paths and names

new ShopItem('img/bag.jpg', 'Bag');
new ShopItem('img/banana.jpg', 'Banana');
new ShopItem('img/bathroom.jpg', 'Bathroom');
new ShopItem('img/boots.jpg', 'Boots');
new ShopItem('img/breakfast.jpg', 'Breakfast');
new ShopItem('img/bubblegum.jpg', 'Bubblegum');

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

function displayPics() {
  // I need to keep track of clicks.
  // I need 3 different random numbers.
  // I need the random numbers to be different than last time. 
  var randomIndex1 = Math.floor(Math.random() * ShopItem.allItems.length);
  do {
    var randomIndex2 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex1 === randomIndex2);

  do {
    var randomIndex3 = Math.floor(Math.random() * ShopItem.allItems.length);
  } while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2);

  imgEl1.src = ShopItem.allItems[randomIndex1].filepath;
  imgEl1.alt = ShopItem.allItems[randomIndex1].name;
  imgEl2.src = ShopItem.allItems[randomIndex2].filepath;
  imgEl2.alt = ShopItem.allItems[randomIndex2].name;
  imgEl3.src = ShopItem.allItems[randomIndex3].filepath;
  imgEl3.alt = ShopItem.allItems[randomIndex3].name;

}

function handleClick(event) {
  totalClickCount++;
  console.log(totalClickCount);
  for (var i = 0; i < ShopItem.allItems.length; i++) {
    if (event.target.src.slice(48) === ShopItem.allItems[i].filepath) {
      ShopItem.allItems[i].clickCount++;
    }
  }
  if (totalClickCount < 5) {
    displayPics();
  } else {
    displayResults();
  }
}

imgEl1.addEventListener('click', handleClick);
imgEl2.addEventListener('click', handleClick);
imgEl3.addEventListener('click', handleClick);

displayPics();