<template>
  <layout :title="title || repository && repository.name || undefined">
    <div class="rpstr-vw-bs">
      <div
        v-if="repository && !loading"
        class="rpstr-vw-bs__card">
        <div class="rpstr-vw-bs__card__header">
          <repository-info :repository="repository" />
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


const ERROR_VERBOSE_LOOKUP = {
  404: 'Bot not found',
};

const components = {
  Layout,
  RepositoryInfo,
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
  $header-height: 15rem;

  margin: 4rem 0;

  &::before {
    content: "";
    display: block;
    height: $header-height;
    background-color: $color-primary;
    margin-bottom: -($header-height);
  }

  &__card {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: .5rem;

    &__header {
      min-height: $header-height;
      padding: 1rem;
    }

    &__content {
    }

    @media screen and (max-width: 800px) {
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
}
</style>
