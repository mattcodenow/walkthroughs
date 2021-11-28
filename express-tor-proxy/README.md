# Express Tor Proxy
Optional proxy of outgoing request from express through Tor docker image.

## Install
```
npm
```

## Start
Requires docker running:
```
npm run dev
```
The Tor docker image will be downloaded and restarted within the npm scripts.

## Open Browser
Open browser and navigate to [localhost:3000/my-ip/without-tor](http://localhost:3000/my-ip/without-tor) and you should see your real IP and location without obfuscation.  
Open browser and navigate to [localhost:3000/my-ip/with-tor](http://localhost:3000/my-ip/without-tor) and you should see your obfuscated IP and location showing the request proxied through Tor successfully. 