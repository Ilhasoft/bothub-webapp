<template>
  <div class="dashboard-layout">
    <div
      class="dashboard-layout__main-panel">
      <div class="dashboard-layout__main-panel__header">
        <router-link :to="'/home'">
          <div class="dashboard-layout__main-panel__logo clickable" />
        </router-link>
        <router-link
          :to="`/dashboard/${getCurrentRepository.owner__nickname}/${getCurrentRepository.name}`">
          <div
            v-show="hasLoaded"
            class="dashboard-layout__main-panel__header__right">
            <div class="dashboard-layout__main-panel__header__info__badge">
              <custom-icon
                value="botinho"
                size="large"
                class="dashboard-layout__main-panel__header__info__badge__icon"/>
            </div>
            <div class="dashboard-layout__main-panel__header__right__container">
              <div
                class="
              dashboard-layout__main-panel__header__right__wrapper">
                <p
                  class="
               dashboard-layout__main-panel__header__right__wrapper__title">
                  {{ getCurrentRepository.name }}
                </p>
              </div>
              <span class="has-text-white">{{ $t('webapp.dashboard.created_by') }}
                <b class="has-text-primary">{{ getCurrentRepository.owner__nickname }}</b>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <router-view />
    </div>
    <tour
      v-if="getFinalModal && getFinalMessage !== 'true'"
      :step-count="1"
      name="tutorial_button" />
  </div>

</template>
<style lang="scss">
</style>
<script>

import CustomIcon from '@/components/shared/CustomIcon';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DashboardLayout',
  components: {
    CustomIcon,
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      beginnerTutorialModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'myProfile',
      'authenticated',
      'versionEnabled',
      'getFinalModal',
      'getFinalMessage',
    ]),
    hasLoaded() {
      if (this.getCurrentRepository.name) return true;
      return false;
    },
    tutorialEnabled() {
      return process.env.BOTHUB_WEBAPP_TUTORIAL_ENABLED;
    },
  },
  methods: {
    ...mapActions([
      'logout',
      'setTutorialMenuActive',
    ]),
  },
};
</script>
<style lang="scss">
@import '~@/assets/scss/utilities.scss';


html{
  overflow-y:auto
}
.dashboard-layout {
  &__main-panel {
    width: 100%;
    position: relative;
    float: right;

    &__logo {
      background: url(~@/assets/imgs/bothub_white.svg) no-repeat;
      width: 8rem;
      height: 1.5rem;
    }
    &__logo:hover{
      background: url(~@/assets/imgs/bothub_green.svg) no-repeat;
    }

    &__header {
      position: fixed;
      width: inherit;
      z-index: 9;
      height: 6rem;
      background: #404143;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2.5rem 0 2rem;
      box-shadow: 0px 3px 6px #00000029;

    &__right {
      display: flex;
      align-items: center;

        &__wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;

          p {
            color: #FFFFFF;
          }

          &__title {
            font-weight: bold;
            font-size: 1.3rem;
              @media screen and (max-width: 52rem) {
                font-size: 13px;
            }
          }
        }
      }

      &__info {
        display: flex;
        align-items: center;
          @media screen and (max-width: 52rem) {
                  font-size: 13px;
        }
        &__badge {
          margin-right: 1rem;
          position: relative;
          display: block;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: #12a391;
          overflow: hidden;

          &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #FFFFFF;
          }
        }
      }

      @media screen and (max-width: 52rem) {
            padding: 0 0 0 2rem;
            height: 7rem;
      }
    }
  }
}
</style>
