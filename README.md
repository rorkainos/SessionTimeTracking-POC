# Quick 'react-idle-timer' POC to make a session timeout
Note: As i dont have access to the project repo some things were assumed

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Points Of Interest
src
 | components
    - Home.tsx simple log in page with hard coded credentials to mock our project home page, doesn't really matter simply something to redirect too
    - About.tsx mocking a page in our project that we want session timeout tracking
 | utils
    - SessionTimer.ts just encapsulated the logic in this class as i assume we want session timeouts to be consistent across the application. I 
                     placed in interceptor functions incase we want some unique logic for any particular page in the active, prompt or idle 
                     phase of the session timeout workflow. Additionally i thought it possible that for a page we might want to redirect somewhere else
                     after idle rather than home so i made that configurable too (probably not needed).