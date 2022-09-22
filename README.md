# private-blockbusters

## Project Idea
Your own Privete Blockbuster, an app where you can have that nolstalgic feeling back of searching and saving your favorite movies in your own archive.

Search movies titles, select and save your favorite movies, write comments and set up a profile.

## Live Link

https://private-blockbuster.fly.dev/

## API 
OMDB API

  axios.get(`http://www.omdbapi.com/?s=${req.query.movieSearch}&apikey=${process.env.OMDB_API_KEY}`)

## ERD's

![ERD](./imgs/Screen%20Shot%202022-09-13%20at%202.44.11%20PM.png)

## Restful Routing Chart

| METHOD |   ACTION    |           DESCRIPTION             |
|:------:|:-----------:|:---------------------------------:|
| POST   | /singup     | Create new user                   |
| GET    | /signup/new | Render form for creating new User |
| PUT    | /user/:id   | user profile                      |
| DELETE | /user/:id  | Delete User                       |

| METHOD |   ACTION    |            DESCRIPTION               |
|:------:|:-----------:|:------------------------------------:|
| POST   | /user/:id/favorites| add comment or review         |
| GET    | /user/:id/favorites| display all favorites movies  |
| DELETE | /user/:id/favorites/:id|Delete movie from favorites|

| METHOD |   ACTION    |            DESCRIPTION               |
|:------:|:-----------:|:------------------------------------:|
| GET    |         /   |        blockbuster home page         |
| DELETE |    /movies  |         Search for movies            |
| GET    | /movies/:id |display details about the movies and reviews from users|

## Techstack

* Javascript
* CSS
* HTML
* Node
* Axios
* Postgresql
* Sequelize
* Express
* Bcrypt
* Cookie-Parser
* Crypto-JS
* Dotenv
* EJS
* Express-EJS-Layouts
* Method-Override

## User Stories

* As a user I want to create a profile, login and logout
* As a user I want to have my password protected
* As a user I want to be able to search for movies
* As a user I want to be able to add to my favorite's colection
* As a user I want to write comments
* As a non user I want to be able to search for movies

## MVP

* Have users login and out 
* Create a user friendly expirience
* Display all favorite movies in a colection 
* Create a button to add the movies to favorite's colection on movie details
* Add coments that will be privet to users


## Wireframes
![ERD](./imgs/Slice%201.png)
![ERD](./imgs/Slice%201%20(1).png)
![ERD](./imgs/Slice%201%20(2).png)
![ERD](./imgs/Slice%201%20(3).png)
![ERD](./imgs/Slice%201%20(4).png)

## Stretchgoals

* Display favorite colection with slides
* Have the users pic a theme based on a movie for their profile layout

## Potential Roadblocks
* Anything related to Restful Routing and tables relatiion ships