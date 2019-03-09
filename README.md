# PWA demo

Demo URLs

- Running on normal server: https://pwa-demo.druid.fi
- Running on Netlify: https://pwa-demo-druidfi.netlify.com/

## Netlify

- Branch `netlify` is automatically deployed to Netlify.
- Settings are in [netlify.toml](netlify.toml)
- Functions are in [functions](functions) and their source is in [netlify_functions](netlify_functions)
- Functions can be build with `yarn run build:functions`

## TODO

- Netlify version uses `/rss` path from the server version: if that could be done in functions

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md
