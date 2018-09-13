<template>
  <div>
    <p
      v-if="!bhNavigation.children"
      class="bh-navigation__nav">
      <span><a @click.prevent="navigateTo('default')"><bh-icon value="home" /></a></span>
      <span
        v-for="{path, label} in navigation"
        :key="path"><a @click.prevent="navigateTo(path)">{{ label }}</a></span>
    </p>
    <slot :name="currentSlotName" />
  </div>
</template>

<script>
export default {
  name: 'BhNavigation',
  props: {
    actived: {
      type: String,
      default: null,
    },
    separator: {
      type: String,
      default: '.',
    },
  },
  inject: {
    bhNavigation: {
      default: { children: false },
    },
  },
  provide() {
    const bhNavigation = {
      children: true,
    };

    Object.defineProperty(bhNavigation, 'actived', {
      enumerable: true,
      get: () => this.currentActived.split(this.separator).splice(1).join(this.separator),
    });

    return { bhNavigation };
  },
  data() {
    return {
      navigation: [],
    };
  },
  computed: {
    slotKeys() {
      return Object.keys(this.$slots);
    },
    currentActived() {
      const actived = this.bhNavigation.children
        ? this.bhNavigation.actived
        : this.actived;
      return actived || (
        this.slotKeys.includes('default')
          ? 'default'
          : this.slotKeys[0]
      );
    },
    currentSlotName() {
      return this.currentActived.split(this.separator)[0];
    },
  },
  watch: {
    async currentActived() {
      await this.$nextTick();
      this.updateNavigation();
    },
    async actived() {
      await this.$nextTick();
      this.updateNavigation();
    },
  },
  mounted() {
    this.updateNavigation();
  },
  methods: {
    updateNavigation() {
      this.navigation = this.currentActived
        .split(this.separator)
        .map((name, i, array) => {
          const componentOrData = array
            .slice(0, i + 1)
            .reduce((previous, current) => {
              if (!previous) return null;
              const slots = previous.$slots;
              if (!slots) return null;
              const slot = slots[current][0];
              return slot.componentInstance || slot.data;
            }, this) || {};
          return {
            name,
            path: array.slice(0, i + 1).join(this.separator),
            label: (componentOrData.$attrs || componentOrData.attrs || {}).label || name,
          };
        });
    },
    navigateTo(path) {
      this.$emit('update:actived', path);
      this.$emit('navigateTo', path);
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/colors.scss';


.bh {
  &-navigation {
    &__nav {
      margin: 1rem 0;
      > span {
        color: $color-grey;

        &::after {
          margin: 0 .5rem;
          content: "/";
        }

        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
