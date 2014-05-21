## nodejs client for JCDecaux Open Data

This project is a client libray for JC Decaux Open Data. In order to use this API, you need to get a key at http://developer.jcdecaux.com.

## Installation

```
$ npm install node-jcdecaux
```

## Features

All method return promise. So the callback argument is optional.


### init(apiKey, contractName, urlApi)

The first parameter is required. All others are optional

* `apiKey` - api key (for get a key go http://developer.jcdecaux.com) - Required
* `contractName` - set the default contract for all method - Optional
* `urlApi` - url of JCDecaux api (default: `https://api.jcdecaux.com/vls/v1/`) - Optional

### getContracts(callback)

Get the contract list

* `callback` - callback function (`function(err, result)`)- Optional

### getStation(stationId, contractName, callback)

Get station information

* `stationId` - id of the station - Required
* `contractName` - contract name - Optional if set on init
* `callback` - callback function (`function(err, result)`)- Optional

### getStations(cb) 

Get the station list

* `callback` - callback function (`function(err, result)`)- Optional

### getStationsByContract(contractName, callback)

Get the stations of a contract

* `contractName` - contract name - Optional if set on init
* `callback` - callback function (`function(err, result)`)- Optional

## Example

```js
var Api = require('node-jcdecaux');
var apiKey = 'your api key';

Api.init(apiKey);

Api.getContracts(function(err, result) {
  console.log(result);
});

Api.getContracts().then(function(result) {
  console.log(result);
});

```

## Authors

  - [David Touzet](https://github.com/eyolas)

# License

  MIT