## BusMall  

# Week 3 project for Code Fellows 201.

Screenshots below, and the full site can be seen here: https://colson10.github.io/busmall/

I was tasked with creating a web app for a fictional startup: BusMall. They wanted an app that could capture data about which products focus group participants would be most likely to purchase.

The specific web app that was asked for was a website that presents product images three at a time (20 total products). When an image is clicked, all three images are replaced with new images, all different from each other and none matching the previous three. After 25 clicks it tallies the total clicks per image. 

I then added additional functionality that included capturing the number of times each product was displayed. I added a chart with Chart.js and displayed the data after 25 clicks, both the number of clicks each product received, and the number of times that product was displayed. 

We then learned about local storage and I added functionality that captured the object data and stored it in local storage with JSON.stringify. When the page is refreshed it starts with a function that checks if there is local storage, and if there is, it parses the data back out and that's what we start with in the objects' properties (clicks/displays). That way the user can go through the 25 clicks multiple times and all clicks/displays can be captured and shown in the chart. 

I added a button to restart the 25 clicks, and if the user clicks the button before they have completed the 25 clicks it will still capture the unfinished data and add it to the local storage. 

Finally, I added a top performers section at the bottom, which displays the top 3 products by percentage clicked/displayed. 


<img width="1244" alt="screen shot 2018-01-28 at 2 15 36 pm" src="https://user-images.githubusercontent.com/33847838/35487888-015880e8-0436-11e8-8b49-fd56dc9acb30.png">
<img width="1247" alt="screen shot 2018-01-28 at 2 16 00 pm" src="https://user-images.githubusercontent.com/33847838/35487889-03235858-0436-11e8-90d7-f84095596bdd.png">
<img width="1247" alt="screen shot 2018-01-28 at 2 16 45 pm" src="https://user-images.githubusercontent.com/33847838/35487891-04f89030-0436-11e8-8bb4-f5114f8cb435.png">