[![Build Status][build-image]][build-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

## nodejs client for JCDecaux Open Data

This project is a client libray for JC Decaux Open Data. In order to use this API, you need to get a key at http://developer.jcdecaux.com.

## Installation

```
$ npm install node-jcdecaux
```

## historic:
see [historic](history.md)

## Usage

```js
var JCDecaux = require('node-jcdecaux').JCDecaux;
var Api = new JCDecaux(APIKEY)
```

/!\ for old nodejs or for browser, include a promise polyfill ([promise-polyfill][promise-polyfill-url], [yaku][yaku-url]) or [es6-shim][es6-shim-url]

## Features

All method return promise.

### constructor(apiKey, options)

The first parameter is required. All others are optional

* `apiKey` - api key (for get a key go http://developer.jcdecaux.com) - Required
* `options` - options :
  - `contractName` - set the default contract for all method - Optional
  - `urlApi` - url of JCDecaux api (default: `https://api.jcdecaux.com/vls/v1/`) - Optional
  - `timeout` - Integer containing the number of milliseconds to wait for a request to respond before aborting the request

### getContracts()

Get the contract list

### getStation(stationId, contractName)

Get station information

* `stationId` - id of the station - Required
* `contractName` - contract name - Optional if set on init

### getStations()

Get the station list

### getStationsByContract(contractName)

Get the stations of a contract

* `contractName` - contract name - Optional if set on init

## Example

```js
var JCDecaux = require('node-jcdecaux').JCDecaux;
var apiKey = 'your api key';

var Api = new JCDecaux(apiKey);

Api.getContracts().then(function(result) {
  console.log(result);
});

```

## Run tests

```Shell
APIKEY=yourapikey npm test
```

## Authors

  - [David Touzet](https://github.com/eyolas)

# License

  MIT

[build-image]: https://travis-ci.org/eyolas/node-jcdecaux.svg?branch=master
[build-url]: https://travis-ci.org/eyolas/node-jcdecaux
[npm-image]: https://img.shields.io/npm/v/node-jcdecaux.svg?style=flat-square
[npm-url]: https://github.com/eyolas/node-jcdecaux
[gemnasium-image]: http://img.shields.io/gemnasium/eyolas/node-jcdecaux.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/eyolas/node-jcdecaux
[promise-polyfill-url]:https://github.com/taylorhakes/promise-polyfill
[yaku-url]:https://github.com/ysmood/yaku
[es6-shim-url]:https://github.com/paulmillr/es6-shim
