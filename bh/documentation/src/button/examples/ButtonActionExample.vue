<template>
  <div class="bh-grid">
    <bh-button
      secondary
      @click="buttonClicked()">
      Click here
    </bh-button>
    <transition name="fade">
      <p
        v-if="show"
        class="message">Button Clicked!</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    buttonClicked() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.message{
  margin: .5rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
