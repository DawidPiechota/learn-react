# Basic blog app

video: [https://www.youtube.com/watch?v=0el1uCRgTac](https://www.youtube.com/watch?v=0el1uCRgTac)

![main-page](./screenshots/main-page.png)

## Set your local ip

Modify env.js file. 
`LOCAL_IP: <your local ip>`

## Run fake backend 
`npx json-server --host <LOCAL_IP> --watch data/db.json --port 8000`

## Run app
```
yarn install
yarn start
```
