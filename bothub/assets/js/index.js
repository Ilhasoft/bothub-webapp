window.$ = window.jQuery = require('jquery');
require('bootstrap-less');

import Vue from 'vue';
import ListBotCards from "./components/ListBotCards.vue";


const app = new Vue({
    el: '#app',
    components: {
        ListBotCards
    }
});