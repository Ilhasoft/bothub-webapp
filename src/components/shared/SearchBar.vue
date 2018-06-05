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
    color: $grey-dark;
    font-weight: 300;

    @include placeholder {
      color: $grey-lighter;
    }
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

