<template>
  <div class="sidebar">
    <div :class="colapse ? 'sidebar-wrapper' : 'sidebar-wrapper--colapsed'">
      <div
        v-if="colapse"
        class="sidebar-wrapper__colapse-button"
        @click="colapseHandle()">
        <b-icon icon="arrow-left"/>
      </div>
      <b-menu v-if="colapse">
        <div class="menu-header">
          <img
            src="~@/assets/imgs/logo.svg"
            alt="bothub">
        </div>
        <b-menu-list>
          
          <b-menu-item
            tag="router-link"
            :to="{ name: 'repository-summary' }"
            icon="userSecret"
            pack="fa"
            size="is-medium"
            label="Summary"/>
          <b-menu-item
            tag="router-link"
            :to="{ name: 'repository-training' }"
            icon="school"
            label="Training"/>
          <b-menu-item
            :active="isActive"
            :expanded="isActive"
            icon="settings"
            @click="isActive = !isActive">
            <template
              slot="label"
              slot-scope="props">
              Test
              <b-icon
                :icon="props.expanded ? 'menu-down' : 'menu-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'repository-test' }"
              icon="account"
              label="Sentences"/>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'repository-test' }"
              icon="account"
              label="Results"/>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'repository-test' }"
              icon="botinho"
              label="Versions"/>
          </b-menu-item>
          <b-menu-item
            tag="router-link"
            :to="{ name: 'repository-translate' }"
            icon="globe-americas"
            label="Translate"/>
          <b-menu-item
            tag="router-link"
            :to="{ name: 'repository-translations-status' }"
            icon="information-outline"
            label="Translation Status"/>
          <b-menu-item
            icon="information-outline"
            label="Integration"/>
          <b-menu-item
            tag="router-link"
            :to="{ name: 'repository-settings' }"
            icon="information-outline"
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
            size=""
            icon="arrow-right"/>
        </div>
        <b-icon
          class="icon-list"
          icon="account"
          size="" />
        <!-- <b-icon
          class="icon-list"
          icon="home"
          size="is-medium" />
          <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-right">
            <b-icon icon="d0ots-vertical" slot="trigger" class="is-medium"></b-icon>
            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
          </b-dropdown> -->
        <b-icon
          class="icon-list"
          size="is-medium"
          icon="checkSquare" />
        <b-icon
          class="icon-list"
          icon="map" />
        <b-icon
          class="icon-list"
          icon="stop" />
        <b-icon
          class="icon-list"
          icon="dog" />
        <b-icon
          class="icon-list"
          icon="cat" />
      </div>
      <div/>
    </div>
  </div>
</template>
<script>
import SidebarLink from './SideBarLink';
import { botinho } from '../../../../bh/src/icons'

export default {
  name: 'SideBar',
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: 'Paper Dashboard',
    },
    backgroundColor: {
      type: String,
      default: 'black',
      validator: (value) => {
        const acceptedValues = ['white', 'black', 'darkblue'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        const acceptedValues = [
          'primary',
          'info',
          'success',
          'warning',
          'danger',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink,
    };
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
      isActive: true,
      colapse: true,
    };
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    },
  },
  mounted() {
    this.$watch('$route', this.findActiveLink, {
      immediate: true,
    });
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
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
    width: auto;
    height: auto;
    position: absolute;
    top: 2rem;
    left: 0;
    text-align: center;
    vertical-align: center;
    cursor: pointer;
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
