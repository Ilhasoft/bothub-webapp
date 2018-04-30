<template>
  <form class="search" @submit.prevent="onSubmit()">
    <input
      type="text"
      placeholder="the world of robots is here">
    <button><b-icon icon="magnify" /></button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.search {
  position: relative;
  border: 2px solid #2bbfac;
  border-radius: 5px;
  background-color: #fff;
  height: 50px;
  overflow: hidden;


  input {
    width: calc(100% - 56px);
    height: 100%;
    text-align: center;
    border: none;
    outline: none;
    font-size: 18px;
    color: #A5A5A5;
    font-weight: 300;

    $placeholder-color: #B7B7B7;
    &::-webkit-input-placeholder { color: $placeholder-color; }
    &::-moz-placeholder { color: $placeholder-color; }
    &:-ms-input-placeholder { color: $placeholder-color; }
    &:-moz-placeholder { color: $placeholder-color; }
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0 16px;
    background: transparent;
    border: none;
    color: $grey;
    cursor: pointer;
    transition: color .2s ease;
    outline: none;

    &:hover {
      color: $primary;
    }
  }
}
</style>

