<template>
  <div class="spinner">
    <div class="bounce"/>
    <div class="bounce"/>
    <div class="bounce"/>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.spinner {
  margin: 1.5rem auto;
  width: 70px;
  text-align: center;

  .bounce {
    width: 18px;
    height: 18px;
    background-color: $grey-light;

    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
