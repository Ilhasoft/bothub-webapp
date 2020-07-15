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
          <div class="menu-header__logo"/>
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
            :label="$t('webapp.menu.summary')"
            tag="router-link"
            icon="home"/>
          <b-menu-item
            id="tour-training-step-0"
            :to="{ name: 'repository-training' }"
            :label="$t('webapp.menu.training')"
            tag="router-link"
            icon="refresh"/>
          <b-menu-item
            id="tour-evaluate-step-0"
            :active="isTestsActive"
            :expanded="isTestsActive"
            icon="wechat"
            @click="isTestsActive = !isTestsActive">
            <template
              slot="label"
              slot-scope="props">
              <span>{{ $t('webapp.menu.test') }}</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-test' }"
              :label="$t('webapp.menu.sentences')"
              tag="router-link"/>
            <b-menu-item
              :to="{ name: 'repository-results' }"
              :label="$t('webapp.menu.results')"
              tag="router-link"/>
          </b-menu-item>
          <b-menu-item
            id="tour-inbox-step-0"
            :to="{ name: 'repository-log' }"
            :label="$t('webapp.menu.inbox')"
            tag="router-link"
            icon="inbox"/>
          <b-menu-item
            id="tour-translate-step-0"
            :active="isTranslationsActive"
            :expanded="isTranslationsActive"
            icon="translate"
            @click="isTranslationsActive = !isTranslationsActive">
            <template
              slot="label"
              slot-scope="props">
              <span class="menu-text">{{ $t('webapp.menu.translation') }}</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-translate' }"
              :label="$t('webapp.menu.translate')"
              tag="router-link"/>
            <b-menu-item
              :to="{ name: 'repository-translations-status' }"
              :label="$t('webapp.menu.translation_status')"
              tag="router-link"/>
          </b-menu-item>
          <b-menu-item
            id="tour-integrate-step-0"
            :to="{ name: 'repository-integration' }"
            :label="$t('webapp.menu.integration')"
            tag="router-link"
            icon="power-plug"/>
          <b-menu-item
            :active="isSettingsActive"
            :expanded="isSettingsActive"
            icon="cog"
            @click="isSettingsActive = !isSettingsActive">
            <template
              slot="label"
              slot-scope="props">
              <span>{{ $t('webapp.menu.settings') }}</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-settings' }"
              :label="$t('webapp.menu.general')"
              tag="router-link"/>
            <b-menu-item
              v-if="versionEnabled"
              :to="{ name: 'repository-versions' }"
              :label="$t('webapp.menu.versions')"
              tag="router-link"/>
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
          icon="refresh"
          @click.native="routerHandle('repository-training')" />
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="wechat" />
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-test')">
            {{ $t('webapp.menu.sentences') }}
          </b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-results')">
            {{ $t('webapp.menu.results') }}
          </b-dropdown-item>
        </b-dropdown>
        <b-icon
          class="icon-list"
          icon="inbox"
          @click.native="routerHandle('repository-log')" />
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="translate" />
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-translate')">
            {{ $t('webapp.menu.translate') }}
          </b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-translations-status')">
            {{ $t('webapp.menu.translation_status') }}
          </b-dropdown-item>
        </b-dropdown>
        <b-icon
          class="icon-list"
          icon="power-plug"
          @click.native="routerHandle('repository-integration')" />
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="cog" />
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-settings')">
            {{ $t('webapp.menu.settings') }}
          </b-dropdown-item>
          <b-dropdown-item
            v-if="versionEnabled"
            aria-role="listitem"
            @click="routerHandle('repository-versions')">
            {{ $t('webapp.menu.versions') }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  data() {
    return {
      isSettingsActive: false,
      isTestsActive: false,
      isTranslationsActive: false,
      collapse: true,
    };
  },
  computed: {
    ...mapGetters(['versionEnabled']),
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
  padding: 0.5em 1.6rem;
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
    &__logo{
    background: url(~@/assets/imgs/bothub_white.svg) no-repeat;
    width: 8rem;
    height: 1.5rem;
  }
  &__logo:hover{
    background: url(~@/assets/imgs/bothub_green.svg) no-repeat;

  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0px 3px 6px #000000;
  opacity: 1;

  .sidebar-wrapper {
    z-index: 10;
    background: #2F343D;
    height: 100%;
    width: $menu-expanded-size + $menu-padding;
    transition: width .1s;

    &__collapse-button {
      border-radius: 50%;
      color: white;
      background-color: #9E9E9E;
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
