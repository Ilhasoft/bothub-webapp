<template>
  <transition name="slide">
    <div
      v-show="isActive && visible"
      class="tab-item"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BhTabItem',
  props: {
    label: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: false,
      transitionName: null,
    };
  },
  created() {
    if (!this.$parent.$data.isTabs) {
      this.$destroy();
      throw new Error('You should wrap bTabItem on a bTabs');
    }
    this.$parent.tabItems.push(this);
  },
  beforeDestroy() {
    const index = this.$parent.tabItems.indexOf(this);
    if (index >= 0) {
      this.$parent.tabItems.splice(index, 1);
    }
  },
  methods: {
    activate(oldIndex, index) {
      if (!this.$parent.animated) {
        this.transitionName = null;
      } else {
        this.transitionName = index < oldIndex
          ? 'slide-next'
          : 'slide-prev';
      }
      this.isActive = true;
    },
    deactivate(oldIndex, index) {
      if (!this.$parent.animated) {
        this.transitionName = null;
      } else {
        this.transitionName = index < oldIndex
          ? 'slide-next'
          : 'slide-prev';
      }
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: .3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
