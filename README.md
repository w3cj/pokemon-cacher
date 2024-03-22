# Pokemon Cacher

This API caches pokemon responses from the [Poke API](https://pokeapi.co/).

A request to:
`GET /api/v1/pokemon/:pokemon_name`

Retrieves and caches a request to:
`GET https://pokeapi.co/api/v2/pokemon/:pokemon_name`

## Setup

You will need node.js, npm and redis to run this API.

Install dependencies:

```
npm install
```

Create a .env and update it with your redis connection details:

```
cp .env.sample .env
```

## Development

```
npm run dev
```


