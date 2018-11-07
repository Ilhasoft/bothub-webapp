<template>
  <transition
    :name="transitionName"
    @after-enter="afterEnter"
  >
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
      throw new Error('You should wrap bhTabItem on a bhTabs');
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
    afterEnter() {
      this.$parent.tabContent = true;
    },
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
@import '@scss/variables.scss';


.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform $speed-fast cubic-bezier(0.785, 0.135, 0.150, 0.860);
}
.slide-prev-leave-to, .slide-next-enter {
  position: absolute;
  width: 100%;
  transform: translate3d(-100%, 0, 0);
}
.slide-prev-enter, .slide-next-leave-to {
  position: absolute;
  width: 100%;
  transform: translate3d(100%, 0, 0);
}
</style>
