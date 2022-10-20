# Nuxt Movies Proxy

Proxy hosts is a lightweight proxy server for the tmdb api and youtube images.

- Speeds up API responses by leveraging the SWR cache.
- Speeds up the development by removing the requirement of having a local token set up.
- Speeds up the performances by optimizing images using [unjs/ipx](https://github.com/unjs/ipx).
- Allows easily deploying the main project to any hosting platform, yet leveraging caching and image optimization.

## Setup

1. Take a copy of `.env.example` and re-name to `.env`
2. Get your [TMDB](https://developers.themoviedb.org/3) API key
3. Enter the details into the `.env` file
4. Start the dev server with the following scripts

``` bash
# Enable pnpm
$ corepack enable

# Install dependencies
$ pnpm install

# Start dev server with hot reload at localhost:3001
$ pnpm dev
```
