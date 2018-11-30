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
