<template>
  <div class="bh-tabs">
    <nav class="bh-tabs__tab">
      <ul class="bh-grid bh-grid--inline">
        <li
          v-for="(tabItem, index) in tabItems"
          v-show="tabItem.visible"
          :key="index"
          :class="{
            'is-active': activeTab === index,
            'bh-grid__item bh-grid__item--nested': true,
            'clickable': true
          }"
          @click="tabClick(index)"
        >
          <span>{{ tabItem.label }}</span>
        </li>
      </ul>
    </nav>
    <section
      :class="{
        'bh-tabs__tab-content': tabContent,
        'bh-tabs__tab-content--hidden': !tabContent
      }"
    >
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  name: 'BhTabs',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeTab: this.value || 0,
      tabItems: [],
      isTabs: true,
      tabContent: true,
    };
  },
  watch: {
    value(value) {
      this.changeTab(value);
    },
    tabItems() {
      if (this.tabItems.length) {
        this.tabItems[this.activeTab].isActive = true;
      }
    },
  },
  mounted() {
    if (this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true;
    }
  },
  methods: {
    changeTab(newIndex) {
      if (this.activeTab === newIndex) return;
      this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
      this.tabItems[newIndex].activate(this.activeTab, newIndex);
      this.activeTab = newIndex;
      this.$emit('change', newIndex);
    },
    tabClick(value) {
      this.tabContent = false;
      this.$emit('input', value);
      this.changeTab(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@scss/colors.scss';


.bh {
  &-tabs {
    &__tab {
      margin: 0px;
      border-bottom: 1px solid $color-grey;

      ul {
        padding: 0px;
        margin: 0px;

        li {
          padding: .5rem 1rem;
          margin-bottom: -1px;
          list-style-type: none;

          &.is-active {
            color: $color-primary;
            border-bottom: 1px solid $color-primary;
          }
        }

        li:hover {
          margin-bottom: -1px;
          list-style-type: none;
          border-bottom: 1px solid $color-grey-dark;
        }
      }
    }

    &__tab-content {
      position: relative;
      padding: 1rem;
      overflow: visible;
    }

    &__tab-content--hidden {
      position: relative;
      padding: 1rem;
      overflow: hidden;
    }
  }
}
</style>
