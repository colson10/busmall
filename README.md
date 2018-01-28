## BusMall  

# Week 3 project for Code Fellows 201.

I was tasked with creating a website that presents product images three at a time (20 total products). When an image is clicked, all three images are replaced with new images, all different from each other and none matching the previous three. After 25 clicks it tallies the total clicks per image. 

I then added additional functionality including capturing the number of times each product was displayed. I added a chart with Chart.js and displayed the data after 25 clicks, both the number of clicks each product received, and the number of times that product was displayed. 

We then learned about local storage and I added functionality that captured the object data and stored it in local storage with JSON.stringify. Then when the page is refreshed it starts with a function that checks if there is local storage, and if there is it starts with that data in the objects' properties (clicks/displays). That way the user can go through the 25 clicks multiple times and all clicks/displays can be captured and shown in the chart. 

I added a button to restart the 25 clicks, and if the user clicks the button before they have completed the 25 clicks it will capture the unfinished data and add it to the local storage. 

Finally, I added a top performers section at the bottom, which displays the top 3 products by percentage clicked/displayed. 

Site can be seen here: https://colson10.github.io/busmall/

https://user-images.githubusercontent.com/33847838/35487888-015880e8-0436-11e8-8b49-fd56dc9acb30.png

https://user-images.githubusercontent.com/33847838/35487889-03235858-0436-11e8-90d7-f84095596bdd.png

https://user-images.githubusercontent.com/33847838/35487891-04f89030-0436-11e8-8bb4-f5114f8cb435.png