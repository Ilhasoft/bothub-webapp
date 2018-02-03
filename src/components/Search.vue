<template>
  <div class="search">
    <input class="search__input" type="text" placeholder="the world of robots is here">
    <button class="search__button"><i class="material-icons">search</i></button>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  @import '../assets/scss/_colors';
  .search {
    margin-top: 40px;
    position: relative;
    top: 25px;
    border: 2px solid $dark-green;
    border-radius: 5px;
    background-color: #fff;
  }
  .search__input {
    text-align: center;
    border: none;
    font-size: 20px;
    color: #A5A5A5;
    font-weight: 300;
    height: 50px;
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #B7B7B7;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: #B7B7B7;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: #B7B7B7;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: #B7B7B7;
    }
  }
  .search__button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 20px;
    height: 100%;
    background: transparent;
    border: none;
    &:hover {
      color: $primary-color;
    }
  }
</style>
