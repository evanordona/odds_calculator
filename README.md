# Odds_calculator

Created by: Evan Ordona

Description:
This Web App was created using React, Tailwind, Express, Node JS, and MongoDB. 

The app fetches data from a sports API storing the data/stats of each team into a MongoDB database.
Once you click the blue button on the home page, the app will display the NBA games going on today which were collected through web scraping using puppeteer. Each game displays the average spread of the game from all sportsbooks. Using a simple formula, the app will return what it believes the spread should be and from there you can decide what team should be bet on or if a bet should even be made. It pulls the team stats from the MongoDB database. Eventually, the app will contain authentication to access it's data.

The Odds are always for the Away Team.
Example: 
Hawks vs Hornets +4 +3.6

Here it is saying that most sportsbooks believe the Hornets will come within 4 points of the Hawks.
My app believes the Hornets will come within 3.6 points of the Hawks. Thus, it believes the Hornets have a slight advantage given these odds. 

It is up to the user to decide whether or not to take action on these odds. Make sure sportsbetting is legal in your state.

APIs used:
https://sportsdata.io/nba-api

YouTube Demo Video:
https://www.youtube.com/watch?v=rsWYznlQXEA&ab_channel=imevano21

NOTE:
- Scroll down to use a form that retrieves a team's stats
- Steps to run locally 
    - add this line to the package.json file in the client directory: "proxy": "localhost:5000/",
    - you will also need to change the form action to 'localhost:5000/games' within Form.js and replace "https://oddscalculator.herokuapp.com/calculate"
      that's located in Home.js to 'localhost:5000/calculate'
    - run 'npm i' and then 'npm start'. in another terminal enter 'cd client', 'npm i', and then 'npm start'

Site:
https://oddscalculator.herokuapp.com/

May not work properly...
Heroku doesn't like my that my request to the home page is taking so long since I have many async functions.
Heroku will call an error if the request takes up to 30 seconds.

