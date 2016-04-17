2.0.0 / 2015-04-17
==================

* all rewrite (typescript)
* update test

1.1.3 / 2014-09-23
==================

* update "request"


1.1.2 / 2014-08-13
==================

* update "args-js"
* update "q"
* update "request"
* update "valid-url"
* update test


1.1.1 / 2014-05-31
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
