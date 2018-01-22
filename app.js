'use strict';

// Make array to store objects
ShopItem.allItems = [];

// Make variable to access img elements by id

var imgEl = document.getElementById('busmall-item');

// Make Constructor Function

function ShopItem(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  ShopItem.allItems.push(this);
}

// Make instances of the objects with file paths and names

new ShopItem('img/bag.jpg', 'Bag');
new ShopItem('img/banana.jpg', 'Banana');
new ShopItem('img/bathroom.jpg', 'Bathroom');

// Make an event listener

imgEl.addEventListener('click', randomPic);

// callback function in event listener to display three random images when an image is clicked. 

function randomPic() {
  var randomIndex = Math.floor(Math.random() * ShopItem.allItems.length);
  imgEl.src = ShopItem.allItems[randomIndex].filepath;
  imgEl.alt = ShopItem.allItems[randomIndex].name;
}

randomPic();