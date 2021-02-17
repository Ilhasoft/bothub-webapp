<template>
 <div class="sidebar">
   <unnnic-sidebar :expanded="collapse"
    :class="collapse ? 'sidebar-wrapper' : 'sidebar-wrapper--collapsed'">
  <div
    class="unnic--clickable sidebar-wrapper__header"
    v-show="collapse"
    slot="header">

    <div class="sidebar-wrapper__header__field">
      <unnnic-icon icon="science-fiction-robot-1" scheme="aux-blue" size="sm" hasBackground/>

      <div class="sidebar-wrapper__header__field__description">
        <div class="sidebar-wrapper__header__field__description__repository">
          <p class="sidebar-wrapper__header__field__description__repository__title">
            {{ getCurrentRepository.name }}
          </p>
          <span @click="routerHandle('home')">
            <unnnic-icon class="unnic--clickable
          sidebar-wrapper__header__field__description__repository__icon" hasBackground
           icon="button-refresh-arrows-1" size="sm"
            />
         </span>
        </div>
        <p class="sidebar-wrapper__header__field__description__created-by">
          CRIADO POR
          <span class="sidebar-wrapper__header__field__description__created-by__nick">
            {{ formatUserNickName }}
          </span>
        </p>
      </div>
    </div>

      <unnnic-select
        :selected="getNameVersion" v-show="collapse"
        class="unnic--clickable sidebar-wrapper__header__select" size="sm">
        <unnnic-select-item
          @click="routerHandle('repository-versions')" size="sm">
          {{ $t('webapp.dashboard.all_versions') }}
        </unnnic-select-item>

        <unnnic-select-item
          v-for="(version, index) in allVersions"
          :key="index"
          @click="handleVersion(version.id, version.name)" size="sm">
          {{ version.name }}
      </unnnic-select-item>


      </unnnic-select>
    </div>
    <div class="sidebar-wrapper__body">

      <unnnic-sidebar-menu>
        <unnnic-sidebar-item
          icon="layout-dashboard-1"
          :text="$t('webapp.menu.summary')"
          :enableTooltip="!collapse"
          @click.native="setSelectMenu({
            name: 'repository-summary',
            dropdown: '',
            to: 'repository-summary'
          })"
            :class="
            [checkSelectedMenu('repository-summary') ? 'sidebar-wrapper__body--active' : '']"
          />
        <unnnic-sidebar-item
          icon="flash-1-3"
          :text="$t('webapp.menu.training')"
          :enableTooltip="!collapse"
          :class="{
            'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTrainActive' && collapse}"
          @click.native="openDropdown('isTrainActive')">
            <div v-if="dropSelect === 'isTrainActive' && collapse"
            class="sidebar-wrapper__body__item">
              <unnnic-sidebar-item
                :text="$t('webapp.menu.train')"
                :class="
                [checkSelectedMenu('repository-training') ? 'sidebar-wrapper__body--active' : '']"
                @click="setSelectMenu({name: 'repository-training', to: 'repository-training'})"/>
              <unnnic-sidebar-item
                :text="$t('webapp.menu.suggestion')"
                :class="
                [checkSelectedMenu('repository-suggestion') ? 'sidebar-wrapper__body--active' : '']"
                @click="setSelectMenu({name: 'repository-suggestion',
                 to: 'repository-suggestion'})"/>
            </div>
        </unnnic-sidebar-item>
          <unnnic-sidebar-item
          icon="check-square-1"
          :text="$t('webapp.menu.test')"
          :enableTooltip="!collapse"
          :class="{
            'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTestsActive' && collapse}"
          @click="openDropdown('isTestsActive')">
          <div v-show="dropSelect === 'isTestsActive'" class="sidebar-wrapper__body__item">
            <unnnic-sidebar-item
            :text="$t('webapp.menu.test-manual')"
            :class="
            [checkSelectedMenu('repository-test-manual') ? 'sidebar-wrapper__body--active' : '']"
            @click="setSelectMenu(
              {name: 'repository-test-manual',  to: 'repository-test-manual'})"/>
            <unnnic-sidebar-item
            :text="$t('webapp.menu.results')"
            :class="
            [checkSelectedMenu('repository-results') ? 'sidebar-wrapper__body--active' : '']"
            @click="setSelectMenu({name: 'repository-results',  to: 'repository-results'})"/>
          </div>
        </unnnic-sidebar-item>
        <unnnic-sidebar-item
          icon="download-bottom-1"
          :text="$t('webapp.menu.inbox')"
          :enableTooltip="!collapse"
          @click="setSelectMenu({name: 'repository-log', dropdown: '', to: 'repository-log'})"
          :class="
          [checkSelectedMenu('repository-log') ? 'sidebar-wrapper__body--active' : '']"
          />
        <unnnic-sidebar-item
          icon="translate-1"
          :text="$t('webapp.menu.translation')"
          :enableTooltip="!collapse"
          :class="{
            'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTranslationsActive'
            && collapse}"
          @click="openDropdown('isTranslationsActive')">
          <div v-show="dropSelect === 'isTranslationsActive'" class="sidebar-wrapper__body__item">
            <unnnic-sidebar-item
            :text="$t('webapp.menu.translate')"
            @click="setSelectMenu({name: 'repository-translate', to: 'repository-translate'})"
            :class="
              [checkSelectedMenu('repository-translate') ? 'sidebar-wrapper__body--active' : '']"/>
            <unnnic-sidebar-item
            :text="$t('webapp.menu.translation_status')"
            @click="setSelectMenu(
              {name: 'repository-translations-status',to: 'repository-translations-status'})"
            :class="[
            checkSelectedMenu('repository-translations-status')
            ? 'sidebar-wrapper__body--active' : '']"/>
          </div>
        </unnnic-sidebar-item>
        <unnnic-sidebar-item
          icon="charger-1"
          :text="$t('webapp.menu.integration')"
          :enableTooltip="!collapse"
          @click="setSelectMenu(
            {name: 'repository-integration', dropdown: '',  to: 'repository-integration'})"
            :class="[checkSelectedMenu('repository-integration')
            ? 'sidebar-wrapper__body--active' : '']"/>
          <unnnic-sidebar-item
            icon="cog-1"
            :text="$t('webapp.menu.settings')"
            :enableTooltip="!collapse"
            :class="{'sidebar-wrapper__body--dropdown-open': dropSelect === 'isSettingsActive'
            && collapse}"
            @click="openDropdown('isSettingsActive')">
          <div v-show="dropSelect === 'isSettingsActive'" class="sidebar-wrapper__body__item">
            <unnnic-sidebar-item
            :text="$t('webapp.menu.general')"
          @click.native="setSelectMenu(
            {name: 'repository-settings', to: 'repository-settings'})"
            :class="[
            checkSelectedMenu('repository-settings') ? 'sidebar-wrapper__body--active teste' : '']"
             />
            <unnnic-sidebar-item
            :text="$t('webapp.menu.versions')"
            @click.native="setSelectMenu(
              {name: 'repository-versions', to: 'repository-versions'}
            )"
            :class="[
            checkSelectedMenu('repository-versions') ? 'sidebar-wrapper__body--active' : '']"
            />
          </div>
        </unnnic-sidebar-item>
    </unnnic-sidebar-menu>
      </div>
      <div slot="footer">
        <unnnic-sidebar-item
          icon="expand-8-1"
          text="Encolher" @click="collapseHandle()"/>
      </div>
    </unnnic-sidebar>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import CustomIcon from '@/components/shared/CustomIcon';

export default {
  name: 'SideBar',
  components: {
    CustomIcon,
  },
  data() {
    return {
      isSettingsActive: false,
      isTestsActive: false,
      isTranslationsActive: false,
      isTrainActive: false,
      selectedMenu: '',
      collapse: true,
      allVersions: [],
      dropSelect: ''
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'authenticated',
      'getUpdateVersionsState',
      'versionEnabled',
      'getNameVersion'
    ]),
    repositoryUUID() {
      if (!this.getCurrentRepository) return null;
      return this.getCurrentRepository.uuid;
    },
    formatUserNickName(){
      return this.getCurrentRepository.owner__nickname?.toUpperCase()
    }
  },
  watch: {
    repositoryUUID() {
      if (this.authenticated) {
        this.getAllVersions();
      }
    },
    authenticated() {
      if (this.authenticated) {
        this.getAllVersions();
      }
    },
    getUpdateVersionsState() {
      if (this.getUpdateVersionsState) {
        this.getAllVersions();
        this.setUpdateVersionsState(false);
      }
    },
  },
  mounted() {
    this.getAllVersions();
    this.setInitialSelectedMenu();
  },
  methods: {
    ...mapActions([
      'getFirstFiveVersions',
      'setRepositoryVersion',
      'setUpdateVersionsState',
    ]),
    async getAllVersions() {
      if (!this.repositoryUUID) return;
      this.isLoading = true;
      try {
        const response = await this.getFirstFiveVersions(this.repositoryUUID);
        this.allVersions = response.data.results;
      } finally {
        this.isLoading = false;
      }
    },
    handleVersion(id, name) {
      const version = {
        id,
        name,
      };
      this.setRepositoryVersion({
        version,
        repositoryUUID: this.repositoryUUID,
      });
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    setInitialSelectedMenu() {
      this.selectedMenu = this.$router.currentRoute.name;
      if (this.$router.currentRoute.name === 'repository-settings'
      || this.$router.currentRoute.name === 'repository-versions') {
        this.dropSelect = 'isSettingsActive'
      }
      if (this.$router.currentRoute.name === 'repository-translate'
      || this.$router.currentRoute.name === 'repository-translations-status') {
        this.dropSelect = 'isTranslationsActive'
      }
      if (this.$router.currentRoute.name === 'repository-test-automatic'
      || this.$router.currentRoute.name === 'repository-test-manual'
      || this.$router.currentRoute.name === 'repository-results') {
        this.dropSelect = 'isTestsActive'
      }
      if (this.$router.currentRoute.name === 'repository-training'
      || this.$router.currentRoute.name === 'repository-suggestion') {
        this.dropSelect = 'isTrainActive'
      }
    },
    checkSelectedMenu(menu) {
      return menu === this.selectedMenu;
    },
    openDropdown(value){
      this.dropSelect = value
    },
    setSelectMenu(option) {
      this.selectedMenu = option.name;
      if (option.to){
        this.routerHandle(option.to)
      }
      this.dropSelect = option.dropdown
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
@import '~@/assets/scss/variables.scss';
@import '~unnic-system-beta/dist/unnnic.css';
@import '~unnic-system-beta/src/assets/scss/unnnic.scss';

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
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  opacity: 1;
  font-family: $font-family;

  .sidebar-wrapper {
    z-index: 10;
    background-color: $unnnic-color-background-snow;
    border-right: 1px solid $unnnic-color-neutral-soft;
    height: 100%;
    width: $menu-expanded-size;
    transition: width .1s;
    font-family: $font-family;

    &__header {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid $unnnic-color-neutral-soft;
      height: 6.75rem;

      &__select {
        z-index: 10;
        margin-top: 1.0625rem;
      }


      &__field{
        font-family: $unnnic-font-family-secondary;
        display: flex;

        &__description{
          display: flex;
          flex-direction: column;
          margin-left: 0.625rem;
          max-width: 6.875rem;

          &__repository{
            display: flex;

          &__title{
            display: flex;
            font-weight: $unnnic-font-weight-bold;
            font-size: $unnnic-font-size-body-gt;
            color: $unnnic-color-brand-weni;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            max-width: 6.875rem;
          }

          &__icon{
            margin-left: 0.1rem;
            color: $unnnic-color-neutral-cleanest;
            cursor: pointer;
          }

      }
          &__created-by {
            font-size: 8px;
            font-weight: $unnnic-font-weight-bold;
            line-height: ($unnnic-line-height-small + $unnnic-font-size-body-sm);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &__nick{
              color: $unnnic-color-brand-weni
            }
          }
        }
      }

    }

    &__body{
        margin-top: -1.3rem ;

        &--dropdown-open{
          border-bottom: 1px solid $unnnic-color-neutral-soft;
        }

        &--active{
          background-color: $unnnic-color-neutral-lightest;
          color: $unnnic-color-neutral-darkest;
          font-weight: $unnnic-font-weight-bold;

          .unnnic-icon{
            color: $unnnic-color-brand-weni
          }
        }

        &__item {
           margin-left: 0.8rem;
           margin-top: 1rem;
           width: 130px;
        }

        &__divider {
          border-bottom: 1px solid $unnnic-color-neutral-soft;
        }
    }

    &--collapsed {
      height: 100%;
      padding: 1rem;
      transition: width .1s;
      width: $menu-collapsed-size;
      background-color: $unnnic-color-background-snow;
      border-right: 1px solid $unnnic-color-neutral-soft;
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
