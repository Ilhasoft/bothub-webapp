<template>
  <div class="sidebar">
    <unnnic-sidebar
      :expanded="collapse"
      :class="collapse ? 'sidebar-wrapper' : 'sidebar-wrapper--collapsed'"
    >
      <section class="unnic--clickable sidebar-wrapper__header" slot="header">
        <div class="sidebar-wrapper__header__field">
          <div class="sidebar-wrapper__header__field__back" v-if="collapse">
            <unnnic-icon icon="keyboard-arrow-left-1" size="xs" />
            <span
              class="sidebar-wrapper__header__field__back__text"
              @click="routerHandle('home')"
              >{{ $t("webapp.menu.back_text") }}</span
            >
          </div>
          <div class="sidebar-wrapper__header__field__back--collapsed" v-else>
            <unnnic-tool-tip :text="$t('webapp.menu.back_text')" enabled side="right">
              <unnnic-icon
                icon="keyboard-arrow-left-1"
                size="md"
                @click.native="routerHandle('home')"
                clickable
              />
            </unnnic-tool-tip>
          </div>

          <div class="sidebar-wrapper__header__field__detail" v-show="collapse">
            <span
              class="sidebar-wrapper__header__field__detail__title"
              :title="getCurrentRepository.name"
            >
              {{ getCurrentRepository.name }}
            </span>
            <div class="sidebar-wrapper__header__field__detail__created-by">
              <span class="sidebar-wrapper__header__field__detail__created-by__text">
                {{ $t("webapp.menu.created_by") }}
              </span>
              <span
                class="sidebar-wrapper__header__field__detail__created-by__nick"
                :title="getCurrentRepository.owner__nickname"
              >
                {{ getCurrentRepository.owner__nickname }}
              </span>
            </div>
          </div>
        </div>

        <unnnic-select
          v-if="repositoryType === 'classifier'"
          :selected="getNameVersion"
          v-show="collapse"
          class="unnic--clickable sidebar-wrapper__header__select"
          size="sm"
          hasCloudyColor
          :placeholder="getNameVersion"
          v-model="selectedVersion"
        >
          <option v-for="(version, index) in allVersions" :key="index" size="sm">
            {{ version.name }}
          </option>
          <div
            slot="header"
            @click="routerHandle('repository-versions')"
            class="sidebar-wrapper__header__versions"
          >
            {{ $t("webapp.dashboard.all_versions") }}
          </div>
        </unnnic-select>
      </section>
      <section class="sidebar-wrapper__body">
        <unnnic-sidebar-menu v-if="repositoryType === 'content'">
          <unnnic-sidebar-item
            :icon="
              checkSelectedMenu('repository-content-bases')
                ? 'layout-dashboard-2'
                : 'layout-dashboard-1'
            "
            :text="$t('webapp.menu.content.bases')"
            :enableTooltip="!collapse"
            @click.native="
              setSelectMenu({
                name: 'repository-content-bases',
                dropdown: '',
                to: 'repository-content-bases',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-content-bases')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />
          <unnnic-sidebar-item
            :icon="
              checkSelectedMenu('repository-content-tests') ? 'check-square-2' : 'check-square-1'
            "
            :text="$t('webapp.menu.content.tests')"
            :enableTooltip="!collapse"
            @click.native="
              setSelectMenu({
                name: 'repository-content-tests',
                dropdown: '',
                to: 'repository-content-tests',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-content-tests')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />
          <unnnic-sidebar-item
            :icon="checkSelectedMenu('repository-content-api') ? 'phone-charger-1' : 'charger-1'"
            :text="$t('webapp.menu.content.api')"
            :enableTooltip="!collapse"
            @click.native="
              setSelectMenu({
                name: 'repository-content-api',
                dropdown: '',
                to: 'repository-content-api',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-content-api')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />
          <unnnic-sidebar-item
            :icon="checkSelectedMenu('repository-content-adjustments') ? 'cog-2' : 'cog-1'"
            :text="$t('webapp.menu.content.adjustments')"
            :enableTooltip="!collapse"
            @click.native="
              setSelectMenu({
                name: 'repository-content-adjustments',
                dropdown: '',
                to: 'repository-content-adjustments',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-content-adjustments')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />
        </unnnic-sidebar-menu>

        <unnnic-sidebar-menu v-else-if="repositoryType === 'classifier'">
          <unnnic-sidebar-item
            :icon="
              checkSelectedMenu('repository-summary') ? 'layout-dashboard-2' : 'layout-dashboard-1'
            "
            :text="$t('webapp.menu.summary')"
            :enableTooltip="!collapse"
            @click.native="
              setSelectMenu({
                name: 'repository-summary',
                dropdown: '',
                to: 'repository-summary',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-summary')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />
          <section class="training-menu">
            <unnnic-sidebar-item
              :icon="
                dropSelect === 'isTrainActive' ? 'graph-stats-circle-1-1' : 'graph-stats-circle-1'
              "
              :text="$t('webapp.menu.training')"
              :enableTooltip="!collapse"
              :active="dropSelect === 'isTrainActive'"
              :class="{
                'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTrainActive',
                'sidebar-wrapper__body__element': true
              }"
              @click.native="openDropdown('isTrainActive')"
            >
            </unnnic-sidebar-item>
            <div
              v-show="dropSelect === 'isTrainActive' && collapse"
              class="sidebar-wrapper__body__item"
            >
              <unnnic-sidebar-item
                :text="$t('webapp.menu.train')"
                :class="[
                  checkSelectedMenu('repository-training')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
                @click="
                  setSelectMenu({
                    name: 'repository-training',
                    to: 'repository-training',
                    closeDrop: false
                  })
                "
              />
              <unnnic-sidebar-item
                :text="$t('webapp.menu.suggestion')"
                :class="[
                  checkSelectedMenu('repository-suggestion')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
                @click="
                  setSelectMenu({
                    name: 'repository-suggestion',
                    to: 'repository-suggestion',
                    closeDrop: false
                  })
                "
              />
            </div>
          </section>

          <section class="evaluate-menu">
            <unnnic-sidebar-item
              :icon="dropSelect === 'isTestsActive' ? 'check-square-2' : 'check-square-1'"
              :text="$t('webapp.menu.test')"
              :enableTooltip="!collapse"
              :active="dropSelect === 'isTestsActive'"
              :class="{
                'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTestsActive',
                'sidebar-wrapper__body__element': true
              }"
              @click="openDropdown('isTestsActive')"
            >
            </unnnic-sidebar-item>
            <div
              v-show="dropSelect === 'isTestsActive' && collapse"
              class="sidebar-wrapper__body__item"
            >
              <unnnic-sidebar-item
                :text="$t('webapp.menu.test-manual')"
                :class="[
                  checkSelectedMenu('repository-test-manual')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
                @click="
                  setSelectMenu({
                    name: 'repository-test-manual',
                    to: 'repository-test-manual',
                    closeDrop: false
                  })
                "
              />
              <unnnic-sidebar-item
                :text="$t('webapp.menu.results')"
                :class="[
                  checkSelectedMenu('repository-results')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
                @click="
                  setSelectMenu({
                    name: 'repository-results',
                    to: 'repository-results',
                    closeDrop: false
                  })
                "
              />
            </div>
          </section>

          <unnnic-sidebar-item
            :icon="checkSelectedMenu('repository-log') ? 'messages-bubble-3' : 'messages-bubble-1'"
            :text="$t('webapp.menu.inbox')"
            :enableTooltip="!collapse"
            @click="
              setSelectMenu({
                name: 'repository-log',
                dropdown: '',
                to: 'repository-log',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-log')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />

          <section class="translate-menu">
            <unnnic-sidebar-item
              :icon="dropSelect === 'isTranslationsActive' ? 'translate-2' : 'translate-1'"
              :text="$t('webapp.menu.translation')"
              :enableTooltip="!collapse"
              :active="dropSelect === 'isTranslationsActive'"
              :class="{
                'sidebar-wrapper__body--dropdown-open': dropSelect === 'isTranslationsActive',
                'sidebar-wrapper__body__element': true
              }"
              @click="openDropdown('isTranslationsActive')"
            >
            </unnnic-sidebar-item>
            <div
              v-show="dropSelect === 'isTranslationsActive' && collapse"
              class="sidebar-wrapper__body__item"
            >
              <unnnic-sidebar-item
                :text="$t('webapp.menu.translate')"
                @click="
                  setSelectMenu({
                    name: 'repository-translate',
                    to: 'repository-translate',
                    closeDrop: false
                  })
                "
                :class="[
                  checkSelectedMenu('repository-translate')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
              />
              <unnnic-sidebar-item
                :text="$t('webapp.menu.translation_status')"
                @click="
                  setSelectMenu({
                    name: 'repository-translations-status',
                    to: 'repository-translations-status',
                    closeDrop: false
                  })
                "
                :class="[
                  checkSelectedMenu('repository-translations-status')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
              />
            </div>
          </section>

          <unnnic-sidebar-item
            :icon="checkSelectedMenu('repository-integration') ? 'phone-charger-1' : 'charger-1'"
            :text="$t('webapp.menu.integration')"
            :enableTooltip="!collapse"
            @click="
              setSelectMenu({
                name: 'repository-integration',
                dropdown: '',
                to: 'repository-integration',
                closeDrop: true
              })
            "
            :class="[
              checkSelectedMenu('repository-integration')
                ? 'sidebar-wrapper__body--active'
                : 'sidebar-wrapper__body__element'
            ]"
          />

          <section class="settings-menu">
            <unnnic-sidebar-item
              :icon="dropSelect === 'isSettingsActive' ? 'cog-2' : 'cog-1'"
              :text="$t('webapp.menu.settings')"
              :enableTooltip="!collapse"
              :active="dropSelect === 'isSettingsActive'"
              :class="{
                'sidebar-wrapper__body--dropdown-open': dropSelect === 'isSettingsActive',
                'sidebar-wrapper__body__element': true
              }"
              @click="openDropdown('isSettingsActive')"
            >
            </unnnic-sidebar-item>
            <div
              v-show="dropSelect === 'isSettingsActive' && collapse"
              class="sidebar-wrapper__body__item"
            >
              <unnnic-sidebar-item
                :text="$t('webapp.menu.general')"
                @click.native="
                  setSelectMenu({
                    name: 'repository-settings',
                    to: 'repository-settings',
                    closeDrop: false
                  })
                "
                :class="[
                  checkSelectedMenu('repository-settings')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
              />
              <unnnic-sidebar-item
                :text="$t('webapp.menu.versions')"
                @click.native="
                  setSelectMenu({
                    name: 'repository-versions',
                    to: 'repository-versions',
                    closeDrop: false
                  })
                "
                :class="[
                  checkSelectedMenu('repository-versions')
                    ? 'sidebar-wrapper__body--active'
                    : 'sidebar-wrapper__body__element'
                ]"
              />
            </div>
          </section>
        </unnnic-sidebar-menu>
      </section>
      <div slot="footer" class="sidebar-wrapper__footer">
        <unnnic-sidebar-item
          icon="expand-8-1"
          class="sidebar-wrapper__footer__text"
          :text="$t('webapp.menu.hide')"
          @click="collapseHandle()"
        />
      </div>
    </unnnic-sidebar>
    <span class="sidebar__divider" v-show="collapse" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomIcon from '@/components/shared/CustomIcon';

export default {
  name: 'SideBar',
  components: {
    CustomIcon
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
      dropSelect: '',
      selectedVersion: this.getNameVersion
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
    repositoryType() {
      if (!this.getCurrentRepository) return null;
      return this.getCurrentRepository.repository_type;
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
    selectedVersion() {
      this.handleVersion(this.selectedVersion);
    },
    getUpdateVersionsState() {
      if (this.getUpdateVersionsState) {
        this.getAllVersions();
        this.setUpdateVersionsState(false);
      }
    }
  },
  mounted() {
    this.getAllVersions();
    this.setInitialSelectedMenu();
  },
  methods: {
    ...mapActions(['getFirstFiveVersions', 'setRepositoryVersion', 'setUpdateVersionsState']),
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
    handleVersion(value) {
      const versionResult = this.allVersions.find(option => option.name === value);
      const version = {
        id: versionResult.id,
        name: versionResult.name
      };
      this.setRepositoryVersion({
        version,
        repositoryUUID: this.repositoryUUID
      });
    },
    routerHandle(path) {
      if (path !== this.$router.currentRoute.name) {
        this.$router.push({
          name: `${path}`
        });
      }
    },
    setInitialSelectedMenu() {
      this.selectedMenu = this.$router.currentRoute.name;
      if (
        this.$router.currentRoute.name === 'repository-settings'
        || this.$router.currentRoute.name === 'repository-versions'
      ) {
        this.dropSelect = 'isSettingsActive';
      }
      if (
        this.$router.currentRoute.name === 'repository-translate'
        || this.$router.currentRoute.name === 'repository-translations-status'
      ) {
        this.dropSelect = 'isTranslationsActive';
      }
      if (
        this.$router.currentRoute.name === 'repository-test-automatic'
        || this.$router.currentRoute.name === 'repository-test-manual'
        || this.$router.currentRoute.name === 'repository-results'
      ) {
        this.dropSelect = 'isTestsActive';
      }
      if (
        this.$router.currentRoute.name === 'repository-training'
        || this.$router.currentRoute.name === 'repository-suggestion'
      ) {
        this.dropSelect = 'isTrainActive';
      }
    },
    checkSelectedMenu(menu) {
      return menu === this.selectedMenu;
    },
    openDropdown(value) {
      this.dropSelect = value;
      this.selectedMenu = '';
    },
    setSelectMenu(option) {
      this.selectedMenu = option.name;
      if (option.to) {
        this.routerHandle(option.to);
      }
      if (option.closeDrop) {
        this.dropSelect = option.dropdown;
      }
    },
    collapseHandle() {
      this.$emit('collapse');
      this.collapse = !this.collapse;
    }
  }
};
</script>
<style lang="scss">
@import "~@/assets/scss/utilities.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  opacity: 1;
  font-family: $font-family;
  display: flex;

  .sidebar-wrapper {
    z-index: 10;
    background-color: $unnnic-color-background-snow;
    height: 100%;
    width: $menu-expanded-size;
    transition: width 0.1s;
    font-family: $font-family;
    border-top-left-radius: $unnnic-border-radius-md;

    &__header {
      &__select {
        z-index: 10;
        padding-bottom: $unnnic-spacing-stack-sm;
      }

      &__versions{
        cursor: pointer;
      }

      &__field {
        &__back {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: $unnnic-spacing-stack-sm;

          &--collapsed {
            padding-left: 0.38rem;
            padding-bottom: $unnnic-spacing-stack-sm;
            color: $unnnic-color-neutral-cloudy;
          }

          &__text {
            cursor: pointer;
            text-decoration: underline;
            font-family: $unnnic-font-family-secondary;
            color: $unnnic-color-neutral-cloudy;
            font-weight: $unnnic-font-weight-regular;
            font-size: $unnnic-font-size-body-gt;
            line-height: ($unnnic-line-height-md + $unnnic-font-size-body-gt);
            padding-left: 0.3rem;
          }
        }

        &__detail {
          padding-bottom: $unnnic-spacing-stack-sm;
          &__title {
            font-family: $unnnic-font-family-secondary;
            color: $unnnic-color-neutral-dark;
            font-weight: $unnnic-font-weight-bold;
            font-size: $unnnic-font-size-body-gt;
            line-height: ($unnnic-line-height-small + $unnnic-font-size-body-gt);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            max-width: 9.5625rem;
          }
          &__created-by {
            font-family: $unnnic-font-family-secondary;
            font-size: $unnnic-font-size-body-md;
            font-weight: $unnnic-font-weight-regular;
            line-height: ($unnnic-line-height-small + $unnnic-font-size-body-md);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &__text {
              color: $unnnic-color-neutral-cloudy;
            }
            &__nick {
              color: $unnnic-color-neutral-dark;
              font-weight: $unnnic-font-weight-bold;
            }
          }
        }
      }
    }

    &__body {
      transform: translateY(-1.9rem);

      &__element {
        color: $unnnic-color-neutral-cloudy;
        &:hover {
          background-color: $unnnic-color-background-sky;
        }
      }

      &--dropdown-open {
        background-color: $unnnic-color-background-sky;
        color: $unnnic-color-neutral-darkest;
        font-weight: $unnnic-font-weight-bold;
      }

      &--active {
        background-color: $unnnic-color-background-sky;
        color: $unnnic-color-neutral-darkest;
        font-weight: $unnnic-font-weight-bold;

        .unnnic-icon {
          color: $unnnic-color-brand-weni;
        }
      }

      &__item {
        margin-left: $unnnic-inline-md;
        margin-bottom: $unnnic-spacing-stack-xs;
        border-bottom: 1px solid $unnnic-color-neutral-soft;
      }

      &__divider {
        border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
      }
    }

    &--collapsed {
      height: 100%;
      padding: 1rem;
      transition: width 0.1s;
      width: $menu-collapsed-size;
      background-color: $unnnic-color-background-snow;
      border-right: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
    }
    &__footer {
      &__text {
        color: $unnnic-color-neutral-cloudy;
      }
    }
  }
  &__divider {
    border-left: 1px solid $unnnic-color-neutral-soft;
    height: 93%;
    width: 0.5px;
    margin: auto;
  }
}

.icon-list {
  margin: 0.5rem 0;
  cursor: pointer;
}
.icon-list:hover {
  color: $unnnic-color-brand-weni-soft;
}
</style>
