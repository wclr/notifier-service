# notifier-service

> Simple HTTP service that exposes [node-notifier](https://github.com/mikaelbr/node-notifier) API

## Install

```
npm i notifier-service -g
```

## Usage

To start service (default port is `7777`): 
```
notifier-service ---port 7778
```

Send `GET` or `POST` request to `/notify` with query/data 
of [appropriate format](https://github.com/mikaelbr/node-notifier#cross-platform-advanced-usage):
```
curl "localhost:7778/notify?title=Note&message=Hello%20world"
```

## Licence

WTF.