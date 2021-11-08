# Hari's auction

## How to start?
**Both should be implemented**

### Server
```
cd server
npm i
npm start
```

### Client
```
cd client
npm i
npm start
```


# Home Page – Item’s listing
## Login & Register
![login](https://user-images.githubusercontent.com/63278754/140778158-10cfa1d7-236d-446d-928f-1332d1fed75c.png)
* If you don't have an account, check box and you can sign up for it.

## View All Auctions
![view](https://user-images.githubusercontent.com/63278754/140778161-5e709a31-2fc0-4459-825f-336bbd64531e.png)
* When you sign in the page, you can see the every auction items.

## Create new Auction - modal
![create](https://user-images.githubusercontent.com/63278754/140778152-320ea8cd-5c28-4f64-b490-b92b080b6e4a.png)

# Item Detail Page  
![detail](https://user-images.githubusercontent.com/63278754/140778157-045da0c4-5c23-44ec-9cc1-788977109e13.png)
* Bid Now functionality : available
* Auto-bidding functionality : progressing...


# Dependency 
## Server
```
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^9.0.2",
    "express": "^4.17.1",
    "express-async-errors": "^3.1.1",
    "express-validator": "^6.11.1",
    "helmet": "^4.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^4.1.4",
    "morgan": "^1.10.0",
    "mysql2": "^2.2.5",
    "sequelize": "^6.6.2",
    "socket.io": "^4.1.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
```
## Client
```
 "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.24.0",
    "bootstrap": "^5.1.3",
    "react": "^17.0.2",
    "react-bootstrap": "^1.5.2",
    "react-countdown": "^2.3.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "socket.io-client": "^4.1.2",
    "web-vitals": "^1.0.1"
```
