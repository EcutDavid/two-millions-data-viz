## A case study of data visualization for large data set 
![image](https://cloud.githubusercontent.com/assets/10692276/17745306/f334dce4-64dd-11e6-8712-749f44c786d9.png)   
Environment requirement: node.js `v6.2.0` or newer, unit tests and API will be broken for node which version lower than 6.   
This [module](https://www.npmjs.com/package/n) will help you switch between versions quickly.


## API side
`npm install`   
`npm run test` start unit testes.   
`npm start` start the API server.

## Client side
`npm install`   
`npm run dist` build production assets.  
`npm start` start local development.  

## TODO list
 * Feature level
  - Implement real-time update for data in minute-level and hour-level.
  - Implement real-time update in client side.
  - Provide more features and widgets in client side(now there is no way to switch between hour-level and second-level).
 * Code level
  - Remove hard coding such as API base URL, 100 as the default range.
  - Refactoring `dataManager` in API side, Refactoring `Chart` in client side.
