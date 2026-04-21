# Secure Photo Sharing App

A secure, photo-sharing app built with React and Vite

## Project Overview

This project demonstrates a production-style architecture for:

- Client–server separation
- HTTPS development environment
- Structured routing
- Clean Axios API layer

## Installation & Setup

1. clone repo
2. run npm install in your terminal to install dependecies
3. setup environment configuration file .env
4. start server with "npm run dev"

## Configuration Strategy

Frontend uses centralized Axios instance. This done to provide;

- Single source of API truth
- Interceptor support
- Centralized error handling
- Clean component code

Vite was configured to handle cors

## Navigating the Codebase

app.jsx - This has the router path that serves the frontend routing
style.css - This has the global styles for the app
pages/ - This has the app pages home and feed that exposes api data and serve static page rendering
api/ - This is where the axios instance is implemented for secure API fetch

## Running the Server

### Development

- npm run dev

### Production

- npm run build

## Ben's Reflection

 At the beginning of this project, I was under the impression that we could finish this with routes in the backend. I was heavily mistaken as we needed to see routes making connections and cashing the CSS. As the backend has no CSS. To do this, we need a front-end. We have now made a front-end and a back-end with CSS caching.

## Ben's reflection 2
 One of the things that was difficult with this phase was the time allowed I recieved section A (auth) a day before this assiognment was due. I had to ask for an extention as I had to finish section B and C, giving us enoughf time to compleate the sections.

## ben's reflection 3
This sprinrt was the coolest, I got mongo working for a day but ended up using tj's mongo and it worked!! I can finally see the results of my code and it's so cool. I feel like I have so much to lkearn but everything is coming together.

## ben's reflection 4 
This has been a relaxed portion of the4 assiognment. I started off by installing owsp zap but I couyln't use it as 
TJ's mongo wasn't running and I was using his because although my mongo works for a few minutes after you create a new cluster it is too unrelyable so last assignmen I switched to usinjg his./ I called him last night and he said he would do the testing and the changes whereas I would be in charge of the etrhical and the leagal writeup. To accomplish this I asked clode to make me a framework with this prompt:
"can you please help me complete this assignment? I need a framework for the points I should write about for part D" and gave it the assignment for context. I want to be clear clode wrote no conntent for me, just pointed me in the right directiojn. I then helped our other group member in making the diagram and moved my reflection 3 from the backend readme to the front end readme