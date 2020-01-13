<template>
  <div class="sidebar">
    <div :class="colapse ? 'sidebar-wrapper' : 'sidebar-wrapper--colapsed'">
      <div
        v-if="colapse"
        ref="colapseButton"
        class="sidebar-wrapper__colapse-button"
        @click="colapseHandle()">
        <b-icon 
          pack="fas"
          icon="arrow-right"/>
      </div>
      <b-menu v-if="colapse">
        <div class="menu-header">
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
            icon="ad"
            label="Training"/>
          <b-menu-item
            :active="isActive"
            :expanded="isActive"
            icon="chart-line"
            @click="isActive = !isActive">
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
            <b-menu-item
              :to="{ name: 'repository-test' }"
              tag="router-link"
              label="Versions"/>
          </b-menu-item>
          <b-menu-item
            :to="{ name: 'repository-translate' }"
            tag="router-link"
            icon="language"
            label="Translation"/>
          <b-menu-item
            icon="plug"
            label="Integration"/>
          <b-menu-item
            :to="{ name: 'repository-settings' }"
            tag="router-link"
            icon="cog"
            label="Settings"/>
        </b-menu-list>
      </b-menu>
      <div
        v-else
        class="icon-list-wrapper">
        <div
          v-if="!colapse"
          class="colapse-button icon-list"
          @click="colapseHandle()">
          <b-icon
            icon="arrow-right"/>
        </div>
        <b-icon
          @click.native="routerHandle('repository-summary')"
          class="icon-list"
          icon="home" />
        <b-icon
          @click.native="routerHandle('repository-training')"
          class="icon-list"
          size="is-medium"
          icon="ad" />
        <b-dropdown 
          position="is-bottom-right"
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="chart-line" />
            <b-dropdown-item 
              @click="routerHandle('repository-test')"
              aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item 
              @click="routerHandle('repository-test')"
              aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item 
              @click="routerHandle('repository-test')"
              aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>
        <b-icon
          @click.native="routerHandle('repository-translate')"
          class="icon-list"
          icon="language" />
        <b-icon
          class="icon-list"
          icon="plug" />
        <b-icon
          @click.native="routerHandle('repository-settings')"
          class="icon-list"
          icon="cog" />
      </div>
      <div/>
    </div>
  </div>
</template>
<script>
import { botinho } from '../../../../bh/src/icons';

export default {
  name: 'SideBar',
  data() {
    return {
      isActive: true,
      colapse: true,
    };
  },
  methods: {
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    colapseHandle() {
      this.$emit('colapse');
      this.colapse = !this.colapse;
    },
  },
};
</script>
<style lang="scss">
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
    background: white;
    height: 100%;
    padding: 1rem;
    width: 260px;
    transition: width .1s;

  &__colapse-button {
    background: #696968;;
    color:white;
    width: 2rem;
    height: 2rem;
    position: absolute;
    display: flex;
    align-items: center;
    top: 2rem;
    left: 0;
    cursor: pointer;

    span {
      margin-left: 3px;
    }
  }

    &--colapsed {
      transition: width .1s;
      background: white;
      height: 100%;
      padding: 1rem;
      width: 60px;
      color: grey;
    }
  }
}

.icon-list {
  margin: .5rem 0;
  cursor: pointer;
}
.icon-list:hover {
  color: #00d1b2;
}
</style>
