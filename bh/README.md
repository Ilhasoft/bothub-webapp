# BH UI Framework
BH is the Bothub UI Framework. Created by Ilhasoft's Web Team to atend frontend projects needs.

[![node>=6.9](https://img.shields.io/badge/node-%3E%3D6.9-blue.svg)](https://nodejs.org/en/download/releases/) [![License MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/Ilhasoft/bothub-webapp/blob/master/bh/LICENSE)

## Installation

Start a Vue project with all satisfied dependencies.

1. Install BH npm package.
   ```bash
   git clone https://github.com/ilhasoft/bothub-webapp
   yarn add bothub-webapp/bh
   ```

2. Import and use BH
   ```javascript
   import Vue from 'vue';
   import BH from 'bh';
   import 'bh/src/assets/scss/bh.scss';

   Vue.use(BH);
   ```
