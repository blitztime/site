# Blitztime Web Interface (blitz.red)

This is a web interface to the Blitztime API, written using Vue.

## Setup

Install [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com/). Then use:
```
yarn install
```
To install dependencies. To build the site for production, do:
```
yarn build
```

## Contributing

Compile and hot-reload for development:
```
yarn serve
```
Lint (please make sure to do this before committing):
```
yarn lint
```

## Configuration

You should put configuration in files named `.env.production.local` and/or `.env.development.local`, depending on how you are running it (you can also just use `.env.local`). The following settings are available:

| Name                | Dev default             | Prod default            |
|:-------------------:|:-----------------------:|:-----------------------:|
| `API_URL`           | `http://localhost:8000` | `https://api.blitz.red` |

The default `CMS_URL` is `https://raw.githubusercontent.com/polympics/wiki/build` (note no `index.json`).

These should all be prefixed with `VUE_APP_`. Example file:

```env
VUE_APP_API_URL=http://api.blitz.red.local
```
