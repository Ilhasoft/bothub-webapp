<template>
  <div class="sidebar sidebar__non-printable">
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
            :active="checkSelectedMenu('repository-summary')"
            tag="router-link"
            icon="home"
            @click.native="setSelectMenu({name: 'repository-summary', hideDropdown: true})"/>
          <b-menu-item
            id="tour-training-step-0"
            :active="isTrainActive"
            :expanded="isTrainActive"
            icon="refresh"
            @click="isTrainActive = !isTrainActive">
            <template
              slot="label"
              slot-scope="props">
              <span class="menu-text">{{ $t('webapp.menu.training') }}</span>
              <b-icon
                :icon="props.expanded ? 'caret-down' : 'caret-up'"
                class="is-pulled-right"/>
            </template>
            <b-menu-item
              :to="{ name: 'repository-training' }"
              :active="checkSelectedMenu('repository-training')"
              :label="$t('webapp.menu.train')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-training', hideDropdown: false})"/>
            <b-menu-item
              :to="{ name: 'repository-suggestion' }"
              :active="checkSelectedMenu('repository-suggestion')"
              :label="$t('webapp.menu.suggestion')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-suggestion',
              hideDropdown: false})"/>
          </b-menu-item>
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
              :to="{ name: 'repository-test-manual' }"
              :label="$t('webapp.menu.test-manual')"
              :active="checkSelectedMenu('repository-test-manual')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-test-manual', hideDropdown: false})"/>
            <b-menu-item
              :to="{ name: 'repository-test-automatic' }"
              :label="$t('webapp.menu.test-automatic')"
              :active="checkSelectedMenu('repository-test-automatic')"
              tag="router-link"
              @click.native="setSelectMenu(
                {name: 'repository-test-automatic', hideDropdown: false}
            )"/>
            <b-menu-item
              :to="{ name: 'repository-results' }"
              :label="$t('webapp.menu.results')"
              :active="checkSelectedMenu('repository-results')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-results', hideDropdown: false})"
            />
          </b-menu-item>
          <b-menu-item
            id="tour-inbox-step-0"
            :to="{ name: 'repository-log' }"
            :label="$t('webapp.menu.inbox')"
            :active="checkSelectedMenu('repository-log')"
            tag="router-link"
            icon="inbox"
            @click.native="setSelectMenu({name: 'repository-log', hideDropdown: true})"
          />
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
              :active="checkSelectedMenu('repository-translate')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-translate', hideDropdown: false})"
            />
            <b-menu-item
              :to="{ name: 'repository-translations-status' }"
              :label="$t('webapp.menu.translation_status')"
              :active="checkSelectedMenu('repository-translations-status')"
              tag="router-link"
              @click.native="setSelectMenu(
                {name: 'repository-translations-status', hideDropdown: false}
              )"
            />
          </b-menu-item>
          <b-menu-item
            id="tour-integrate-step-0"
            :to="{ name: 'repository-integration' }"
            :label="$t('webapp.menu.integration')"
            :active="checkSelectedMenu('repository-integration')"
            tag="router-link"
            icon="power-plug"
            @click.native="setSelectMenu({name: 'repository-integration', hideDropdown: true})"/>
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
              :active="checkSelectedMenu('repository-settings')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-settings', hideDropdown: false})"
            />
            <b-menu-item
              v-if="versionEnabled"
              :to="{ name: 'repository-versions' }"
              :label="$t('webapp.menu.versions')"
              :active="checkSelectedMenu('repository-versions')"
              tag="router-link"
              @click.native="setSelectMenu({name: 'repository-versions', hideDropdown: false})"/>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
      <div
        v-else
        class="icon-list-wrapper">
        <custom-icon
          value="botinho"
          size="large"
          class="icon-list"
          @click="routerHandle('home')" />
        <b-icon
          class="icon-list"
          icon="home"
          @click.native="routerHandle('repository-summary')" />
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
          icon="refresh"/>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-training')">
            {{ $t('webapp.menu.train') }}
          </b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-suggestion')">
            {{ $t('webapp.menu.suggestion') }}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          aria-role="list">
          <b-icon
            slot="trigger"
            class="icon-list"
            icon="wechat" />
          <b-dropdown-item
            aria-role="listitem"
            @click="routerHandle('repository-test')">
            {{ $t('webapp.menu.test-manual') }}
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
import CustomIcon from '@/components/shared/CustomIcon';

export default {
  name: 'SideBar',
  components: { CustomIcon },
  data() {
    return {
      isSettingsActive: false,
      isTestsActive: false,
      isTranslationsActive: false,
      isTrainActive: false,
      selectedMenu: '',
      collapse: true,
    };
  },
  computed: {
    ...mapGetters(['versionEnabled']),
  },
  mounted() {
    this.setInitialSelectedMenu();
  },
  methods: {
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    setInitialSelectedMenu() {
      this.selectedMenu = this.$router.currentRoute.name;
      if (this.$router.currentRoute.name === 'repository-settings'
      || this.$router.currentRoute.name === 'repository-versions') {
        this.isSettingsActive = true;
      }
      if (this.$router.currentRoute.name === 'repository-translate'
      || this.$router.currentRoute.name === 'repository-translations-status') {
        this.isTranslationsActive = true;
      }
      if (this.$router.currentRoute.name === 'repository-test-automatic'
      || this.$router.currentRoute.name === 'repository-test-manual'
      || this.$router.currentRoute.name === 'repository-results'
      || this.$router.currentRoute.name === 'repository-result') {
        this.isTestsActive = true;
      }
      if (this.$router.currentRoute.name === 'repository-training'
      || this.$router.currentRoute.name === 'repository-suggestion') {
        this.isTrainActive = true;
      }
    },
    checkSelectedMenu(menu) {
      return menu === this.selectedMenu;
    },
    setSelectMenu(option) {
      this.selectedMenu = option.name;
      if (option.hideDropdown) {
        this.closeDropdowns();
      }
    },
    collapseHandle() {
      this.$emit('collapse');
      this.collapse = !this.collapse;
      this.closeDropdowns();
    },
    closeDropdowns() {
      this.isSettingsActive = false;
      this.isTestsActive = false;
      this.isTranslationsActive = false;
      this.isTrainActive = false;
      this.setInitialSelectedMenu();
    },
  },
};
</script>
<style lang="scss">
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';

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
    background: url(~@/assets/imgs/logo-new-white.svg) no-repeat;
    width: 8rem;
    height: 2.8rem;
  }
  &__logo:hover{
    background: url(~@/assets/imgs/logo-new-sidebars.svg) no-repeat;

  }
}

.sidebar {
  position: fixed;
  top: 5.25rem;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0px 3px 6px #000000;
  opacity: 1;
  font-family: $font-family;

  @media print {
    &__non-printable {
      display: none;
    }
  }

  @media screen and (max-width: $mobile-width) {
    top: 12rem;
  }

  .sidebar-wrapper {
    z-index: 10;
    background: #2F343D;
    height: 100%;
    width: $menu-expanded-size + $menu-padding;
    transition: width .1s;
    font-family: $font-family;

    .side-bar-text {
      margin-left: 0.3rem;
    }

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
