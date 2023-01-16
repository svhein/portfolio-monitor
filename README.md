# Portfolio monitor [https://portfolio-monitor-ef4bf.web.app/](https://portfolio-monitor-ef4bf.web.app/)

Web app for real-time portfolio and stock price monitoring. <br>
App is being build by React, Redux, Node and Firebase.

## Features

- Real time stock data with websocket connection to Yahoo Finance server
- Allows users to add and delete stocks to his portfolio
- Saves users portfolio automatically to his Google account
- Mobile friendly
 

## Run locally

1. Clone the reposity <br>
```
git clone git@github.com:svhein/portfolio-monitor.git
```

2. Install depencies <br>
```
npm install
```

3. Run app in [http://localhost:3000]( http://localhost:3000)
```
npm run start
```

**Note** Incase I've shutdown the Firebase realtime database, you might want to setup your own and update the [firebase-config.js](https://github.com/svhein/portfolio-monitor/blob/master/src/utils/firebase-config.js)
