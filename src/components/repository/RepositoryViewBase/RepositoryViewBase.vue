<template>
  <layout :title="title || repository && repository.name || undefined">
    <div class="rpstr-vw-bs">
      <div
        v-if="repository && !loading"
        class="rpstr-vw-bs__card">
        <div class="rpstr-vw-bs__card__header">
          <div class="bh-grid bh-grid--ever-desktop">
            <div class="bh-grid__item">
              <repository-info :repository="repository" />
            </div>
            <div
              :class="[
                'bh-grid__item',
                'bh-grid__item--grow-0',
                'rpstr-vw-bs__card__header__mobile-navigation',
            ]">
              <repository-navigation :repository="repository" />
            </div>
          </div>
          <repository-navigation
            :repository="repository"
            class="rpstr-vw-bs__card__header__navigation" />
        </div>
        <div class="rpstr-vw-bs__card__content">
          <slot />
        </div>
      </div>
      <div
        v-else-if="errorCode"
        class="rpstr-vw-bs__error">
        <h1>{{ errorCode|errorVerbose }}</h1>
      </div>
      <div
        v-else
        class="rpstr-vw-bs__loading">
        <bh-loading />
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';

import RepositoryNavigation from './RepositoryNavigation';


const ERROR_VERBOSE_LOOKUP = {
  404: 'Bot not found',
};

const components = {
  Layout,
  RepositoryInfo,
  RepositoryNavigation,
};

export default {
  name: 'RepositoryViewBase',
  components,
  filters: {
    errorVerbose: code => (ERROR_VERBOSE_LOOKUP[code] || code),
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    errorCode: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
};
</script>


<style lang="scss" scoped>
@import '~@/bh/assets/scss/colors.scss';
@import '~@/bh/assets/scss/variables.scss';


.rpstr-vw-bs {
  $navigation-height: 4rem;
  $header-height: (14rem + $navigation-height);
  $card-width: 1200px;

  margin: 4rem 0;

  &::before {
    content: "";
    display: block;
    height: $header-height;
    background-color: $color-primary;
    margin-bottom: -($header-height);

    @media screen and (max-width: $card-width) {
      display: none;
    }
  }

  &__card {
    max-width: $card-width;
    margin: 0 auto;
    background-color: white;
    border-radius: .5rem;

    &__header {
      position: relative;
      min-height: $header-height;
      padding: 1rem 1rem $navigation-height;

      &__navigation {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        @media screen and (max-width: $mobile-width) {
          display: none;
        }
      }

      &__mobile-navigation {
        display: none;

        @media screen and (max-width: $mobile-width) {
          display: block;
        }
      }

      @media screen and (max-width: $mobile-width) {
        min-height: auto;
        padding: 1rem;
      }
    }

    @media screen and (max-width: $card-width) {
      border-radius: 0;
    }
  }

  &__error,
  &__loading {
    text-align: center;
  }

  &__error {
    padding: .5rem;
    h1 {
      font-size: 3rem;
      line-height: 4rem;
      font-weight: $font-weight-bolder;
      color: black;
      opacity: .5;
    }
  }

  @media screen and (max-width: $card-width) {
    margin: 1rem 0;
  }
}
</style>
