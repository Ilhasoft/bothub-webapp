<template>
  <div
    class="version-test-item">
    <div
      class="version-test-item__wrapper">
      <div class="version-test-item__wrapper__check">
        <b-checkbox/>
      </div>
      <div class="version-test-item__wrapper__info">
        <evaluate-type-tag evaluate-type="Manual"/>
        <language-badge
          :language="language"
          class="version-test-item__wrapper__info__item"
          main/>
        <span class="version-test-item__wrapper__info__item">
          {{ $t('webapp.result.test') }} #{{ version }}
        </span>
        <small class="version-test-item__wrapper__info__item">
          {{ created_at | moment('from') }}</small>
      </div>
      <div class="version-test-item__wrapper__links">
        <router-link :to="resultRouterParams">
          <a> {{ $t('webapp.result.load_result') }} </a>
        </router-link>/
        <router-link :to="resultRouterParams">
          <a> {{ $t('webapp.result.download') }} </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';
import EvaluateTypeTag from '@/components/repository/repository-evaluate/results/EvaluateTypeTag';

export default {
  name: 'EvaluateVersionItem',
  components: {
    LanguageBadge,
    EvaluateTypeTag,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      default: '',
    },
  },
  computed: {
    resultRouterParams() {
      return {
        name: 'repository-result',
        params: {
          resultId: this.id,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.version-test-item {
  margin: 1rem 0;
  border: 1px solid $color-grey;
  border-radius: 0.5rem;

    a {
      color: $color-fake-black;
    }


  &__wrapper {
    display: flex;
    margin: .5rem;
    align-items: center;
    cursor: pointer;
      a{
        color: $color-primary;
      }
      a:hover {
        color: $color-primary-darker
        }

    &__check {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;
      @media screen and (max-width: $mobile-width) {
        width: 100%;
        justify-content: flex-start;
      }
    }

    &__info {
      flex-grow: 1;
      align-self: center;


      &__item {
        margin: 0 .3rem;
      }

      @media screen and (max-width: $mobile-width) {
        display: grid;
      grid-template-columns: 1fr 1fr;
      }
    }

    &__links {
      margin: .5rem;
        @media screen and (max-width: $mobile-width) {
          margin: 0
        }
    }

    @media screen and (max-width: $mobile-width) {
    flex-direction: column;
    }
  }
}
</style>
