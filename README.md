# ubc-react-support

## Description:
This application is the front end portion for an internal support website.  It includes components to cover on-boarding processes, forms for account submissions, and general IT-Support.

## Before you start:
When downloading the project be sure to run:
```
npm install 
```
Since we have a .gitignore file that ignores node_modules, .DS_Store and our distribution folder

## Local Development:
To start the project in your local environment, run the following:
```
npm run start
```

## Deployment:
The project current uses webpack to bundle the code, and compiles it into the 'dist' folder;  You can do this by running the following:
```
npm run build
```
Then place the browser ready files onto your server

### Configuring your project to a different Strapi Backend:
When switching backends you have to change all corresponding urls that send and receive data from strapi.  Here is a list of the changes that you should make:
- `app/components/Login.js` : inside `Login` class
    - inside `login()` method
        - change: `axios.post()`
- `app/index.js`
    - new ApolloClient needs the proper uri with GraphQL enabled on the backend to query data.

## Quick Documentation:

### Webpack

### React Router

### React Semantic UI

