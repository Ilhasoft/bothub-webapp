<template>
  <div class="up-down-vote">
    <a class="btn vote-button">
      <i class="material-icons">keyboard_arrow_up</i>
    </a>
    <div class="reputation-value">120</div>
    <a class="btn vote-button arrow-down">
      <i class="material-icons">keyboard_arrow_down</i>
    </a>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@import '../assets/scss/_colors';
.up-down-vote {
  display: flex;
  flex-direction: column;
  align-items: center;
  .reputation-value {
    width: 100px;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 20px 0 0 20px;
    color: #FFF;
    text-align: center;
    background-color: $dark-green;
  }
  .vote-button {
    color: $dark-green2;
    font-size: 30px;
    background-color: transparent;
    border: 0;
  }
}
</style>
