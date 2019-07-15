import Vue from 'vue';

export const events = new Vue({
  methods: {
    add(params) {
      console.log('entrou aqui');

      this.$emit('add', params);
    },
  },
});
