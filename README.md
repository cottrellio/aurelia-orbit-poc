# aurelia-orbit-poc

This is a quick and dirty proof of concept for using [OrbitJS](orbitjs.com) in an [AureliaJS](aurelia.io) app as a data layer for requesting/ managing JSON API data.

## Get it running

1. Clone it
2. run `npm install` in the root
3. run `npm start` (it's built from the esnext webpack skeleton).

## OrbitJS Usage

### tl;dr

I'm using the store as the main source with an indexedDB source as the backup. It also uses a indexedDB bucket (so you can inspect the dev tools and see your datas). Finally, it uses JSONAPIsource as the remote source which handles all of the requests. There is a coordinator that hooks into requests/updates on the store and synce both the remote source as well as the backup.

I just followed the "Getting Started" section on [orbitjs.com](http://orbitjs.com/v0.15/guide/getting-started.html). Check it out for a more detailed explanation.

## Highlights

+ You should put the store in a service so you can use it throughout your app.
+ set Orbit.fetch to use the http-fetch-client.fetch
```javascript
import { HttpClient } from 'aurelia-fetch-client';
import Orbit from '@orbit/core';

...

const client = new HttpClient();

// Use http-fetch-client.
Orbit.fetch = client.fetch;
```
+ Remember to delete the `IndexedDB` databases as you make changes to the code.

## Special Thanks

+ Thanks to [Rob Eisenberg](https://github.com/EisenbergEffect) and friends for building AureliaJS!
+ Thanks to [Dan Gebhardt](https://github.com/dgeb) and friends for buidling OrbitJS!

Hope this helps someone :)
