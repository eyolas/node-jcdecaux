1.1.0 / 2014-05-31
==================

* *BREAKING CHANGE* :
  * `init('apikey', options)` option is optional and can has this options:
    - `contractName` - set the default contract for all method
    - `urlApi` - url of JCDecaux api (default: `https://api.jcdecaux.com/vls/v1/`)
    - `timeout` - Integer containing the number of milliseconds to wait for a request to respond before aborting the request
* fix: now all api return json...
* add few tests
* fix: getStation change `stationId` string to int


1.0.1 / 2014-05-27
==================

* Change package.json for add link to the git
