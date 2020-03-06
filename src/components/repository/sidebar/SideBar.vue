<template>
  <div class="sidebar">
    <div :class="collapse ? 'sidebar-wrapper' : 'sidebar-wrapper--collapsed'">
      <div
        ref="collapseButton"
        class="sidebar-wrapper__collapse-button"
        @click="collapseHandle()">
        <b-icon :icon="collapse ? 'chevron-left' : 'chevron-right'" />
      </div>
      <b-menu v-if="collapse">
        <div
          class="menu-header"
          @click="routerHandle('home')">
          <img
            src="~@/assets/imgs/logo.svg"
            alt="bothub">
        </div>
        <b-menu-list>
          <template
            slot="label"
            slot-scope="props">
            Test
            <b-icon
              :icon="props.expanded ? 'caret-down' : 'caret-up'"
              class="is-pulled-right"/>
          </template>
          <b-menu-item
            :to="{ name: 'repository-summary' }"
            tag="router-link"
            icon="home"
            size="is-medium"
            label="Summary"/>
          <b-menu-item
            :to="{ name: 'repository-training' }"
            tag="router-link"
            icon="refresh"
            label="Training"/>
          <b-menu-item
            :active="isTestsActive"
            :expanded="isTestsActive"
            icon="wechat"
            @click="isTestsActive = !isTestsActive">
            <template
              slot="label"
              slot-scope="props">
              <span>Test</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-test' }"
              tag="router-link"
              label="Sentences"/>
            <b-menu-item
              :to="{ name: 'repository-test' }"
              tag="router-link"
              label="Results"/>
          </b-menu-item>
          <b-menu-item
            :to="{ name: 'repository-translate' }"
            tag="router-link"
            icon="translate"
            label="Translation"/>
          <b-menu-item
            :to="{ name: 'repository-integration' }"
            tag="router-link"
            icon="power-plug"
            label="Integration"/>
          <b-menu-item
            :active="isSettingsActive"
            :expanded="isSettingsActive"
            icon="settings"
            @click="isSettingsActive = !isSettingsActive">
            <template
              slot="label"
              slot-scope="props">
              <span>Settings</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-settings' }"
              tag="router-link"
              label="Settings"/>
            <b-menu-item
              :to="{ name: 'repository-versions' }"
              tag="router-link"
              label="Versions"/>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
      <div
        v-else
        class="icon-list-wrapper">
        <bh-icon
          value="botinho"
          size="large"
          class="icon-list"
          @click="routerHandle('home')" />
        <b-icon
          class="icon-list"
          icon="home"
          @click.native="routerHandle('repository-summary')" />
        <b-icon
          class="icon-list"
          icon="wechat"
          @click.native="routerHandle('repository-training')" />
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="chart-line" />
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-test')">Action</b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-test')">Another action</b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-test')">Something else</b-dropdown-item>
        </b-dropdown>
        <b-icon
          class="icon-list"
          icon="translate"
          @click.native="routerHandle('repository-translate')" />
        <b-icon
          class="icon-list"
          icon="power-plug"
          @click.native="routerHandle('repository-integration')" />
        <b-icon
          class="icon-list"
          icon="settings"
          @click.native="routerHandle('repository-settings')" />


      </div>
      <div/>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SideBar',
  data() {
    return {
      isSettingsActive: false,
      isTestsActive: false,
      collapse: true,
    };
  },
  methods: {
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    collapseHandle() {
      this.$emit('collapse');
      this.collapse = !this.collapse;
    },
  },
};
</script>
<style lang="scss">
@import '~@/assets/scss/utilities.scss';

.menu-list a {
  padding: 0.5em 2rem;
}

.icon-list-wrapper {
  text-align: center;
}

.menu-header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;

  img {
    height: 1.5rem;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  .sidebar-wrapper {
    background: #2F343D;
    height: 100%;
    width: $menu-expanded-size + $menu-padding;
    transition: width .1s;

    &__collapse-button {
      border-radius: 50%;
      color: white;
      background-color: #9E9E9E;;
      width: $menu-collapse-button-size;
      height: $menu-collapse_button-size;
      position: absolute;
      top: 2rem;
      right: -$menu-collapse_button-size/2;
      z-index: 2;
      cursor: pointer;
    }

    &--collapsed {
      transition: width .1s;
      background: #2F343D;
      height: 100%;
      padding: 1rem;
      width: $menu-collapsed-size + $menu-padding;
      color: #FFFFFF;
    }
  }
}

.icon-list {
  margin: .5rem 0;
  cursor: pointer;
}
.icon-list:hover {
  color: #12A391;
}
</style>
