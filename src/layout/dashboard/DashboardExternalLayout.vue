<template>
  <div class="external-dashboard-layout">
    <weni-notification class="external-dashboard-layout__notification" />
    <div class="external-dashboard-layout__main-panel">
      <div class="external-dashboard-layout__main-panel__header">
        <router-link :to="'/home'">
          <div class="external-dashboard-layout__main-panel__logo clickable" />
        </router-link>
        <router-link
          :to="`/dashboard/${ownerNickname}/${getExternalRepository.slug}`"
        >
          <div
            v-show="hasLoaded"
            class="external-dashboard-layout__main-panel__header__right"
          >
            <div
              class="external-dashboard-layout__main-panel__header__info__badge"
            >
              <custom-icon
                value="botinho"
                size="large"
                class="external-dashboard-layout__main-panel__header__info__badge__icon"
              />
            </div>
            <div
              class="external-dashboard-layout__main-panel__header__right__container"
            >
              <div
                class="external-dashboard-layout__main-panel__header__right__wrapper"
              >
                <p
                  class="external-dashboard-layout__main-panel__header__right__wrapper__title"
                >
                  {{ getExternalRepository.name }}
                </p>
              </div>
              <span
                class="external-dashboard-layout__main-panel__header__right__wrapper__subtitle"
                >{{ $t("webapp.dashboard.created_by") }}
                <b class="has-text-primary">{{ ownerNickname }}</b>
              </span>
            </div>
          </div>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import CustomIcon from '@/components/shared/CustomIcon';
import { mapGetters } from 'vuex';
import WeniNotification from '@/components/WeniNotification';

export default {
  name: 'DashboardExternalLayout',
  components: {
    CustomIcon,
    WeniNotification,
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      beginnerTutorialModalOpen: false,
    };
  },
  computed: {
    ...mapGetters(['getExternalRepository']),
    ownerNickname() {
      if (!this.getExternalRepository.owner) return null;
      return this.getExternalRepository.owner.nickname;
    },
    hasLoaded() {
      if (this.getExternalRepository.name) return true;
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/utilities.scss";
@import "~@/assets/scss/variables.scss";
@import "~@/assets/scss/colors.scss";

.external-dashboard-layout {
  &__notification {
    top: 0;
    position: fixed;
    z-index: 9;
  }

  &__main-panel {
    width: 100%;
    position: relative;
    float: right;

    &__logo {
      background: url(~@/assets/imgs/weni-logo-green.svg) no-repeat;
      width: 10rem;
      height: 2.8rem;
    }

    &__header {
      position: fixed;
      width: inherit;
      z-index: 9;
      height: 6rem;
      top: 3.7rem;
      display: flex;
      background-color: $color-white;
      justify-content: space-between;
      align-items: center;
      padding: 0 7rem 0 5.7rem;
      @media screen and (max-width: $mobile-width) {
        top: 10rem;
      }

      &__right {
        display: flex;
        align-items: center;

        &__wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &__title {
            font-weight: bold;
            font-size: 1.3rem;
            color: $color-fake-grey;
            @media screen and (max-width: 52rem) {
              font-size: 13px;
            }
          }
          &__subtitle {
            color: $color-fake-grey;
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
            color: #ffffff;
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
