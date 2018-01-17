# BotHub

> A BotHub project

## Build Setup

* Install dependencies `npm install`
* Serve with hot reload at localhost:8080 `npm run dev`
* build for production with minification `npm run build`
* build for production and view the bundle analyzer report `npm run build --report`

## Tests

* run e2e tests `npm run e2e`
* run all tests `npm test`


## Project Structure

```.
   ├── build/                      # webpack config files
   │   └── ...
   ├── config/
   │   ├── index.js                # main project config
   │   └── ...
   ├── src/
   │   ├── main.js                 # app entry file
   │   ├── App.vue                 # main app component
   │   ├── components/             # ui components
   │   │   └── ...
   │   └── assets/                 # module assets (processed by webpack)
   │       └── ...
   ├── static/                     # pure static assets (directly copied)
   ├── test/
   │   └── unit/                   # unit tests
   │   │   ├── specs/              # test spec files
   │   │   ├── eslintrc            # config file for eslint with extra settings only for unit tests
   │   │   ├── index.js            # test build entry file
   │   │   ├── jest.conf.js        # Config file when using Jest for unit tests
   │   │   └── karma.conf.js       # test runner config file when using Karma for unit tests
   │   │   ├── setup.js            # file that runs before Jest runs your unit tests
   │   └── e2e/                    # e2e tests
   │   │   ├── specs/              # test spec files
   │   │   ├── custom-assertions/  # custom assertions for e2e tests
   │   │   ├── runner.js           # test runner script
   │   │   └── nightwatch.conf.js  # test runner config file
   ├── .babelrc                    # babel config
   ├── .editorconfig               # indentation, spaces/tabs and similar settings for your editor
   ├── .eslintrc.js                # eslint config
   ├── .eslintignore               # eslint ignore rules
   ├── .gitignore                  # sensible defaults for gitignore
   ├── .postcssrc.js               # postcss config
   ├── index.html                  # index.html template
   ├── package.json                # build scripts and dependencies
   └── README.md                   # Default README file
   ```

# Front-end - CSS

### Pre-Processors

This project has pre-configured CSS extraction for most popular CSS pre-processors including LESS, SASS, Stylus, and PostCSS. 
To use a pre-processor, all you need to do is install the appropriate webpack loader for it. 
For example, to use SASS:

`npm install sass-loader node-sass --save-dev`

> Note you also need to install node-sass because sass-loader depends on it as a peer dependency.
  
### Using Pre-Processors inside Components

Once installed, you can use the pre-processors inside your `*.vue` components using the lang attribute on `<style>` tags:

```
<style lang="scss">
    /* write SASS! */
</style>
```
