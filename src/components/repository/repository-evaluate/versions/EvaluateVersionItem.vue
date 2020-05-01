<template>
  <div>
    <bh-card
      class="version-test-item">
      <router-link :to="resultRouterParams">
        <div
          class="version-test-item__wrapper">
          <div class="version-test-item__wrapper__info">
            <strong class="version-test-item__wrapper__info__item">
              {{ $t('webapp.result.test') }} #{{ version }}
            </strong>
            <language-badge
              :language="language"
              class="version-test-item__wrapper__info__item"
              main/>
            <small class="version-test-item__wrapper__info__item">
              {{ created_at | moment('from') }}</small>
          </div>
          <div class="version-test-item__wrapper__links">
            <router-link :to="resultRouterParams">
              <a> {{ $t('webapp.result.load_result') }} </a>
            </router-link>
          </div>
        </div>
      </router-link>
    </bh-card>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'EvaluateVersionItem',
  components: {
    LanguageBadge,
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
          version: this.version,
          resultId: this.id,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.version-test-item {
  margin: 1rem;

  &__wrapper {
    display: flex;
    margin: .5rem;
    align-items: center;
    cursor: pointer;

    &__info {
      flex-grow: 1;
      align-self: center;

      &__item {
        margin: 0 .3rem;
      }
    }

    &__links {
      margin: .5rem;
    }
  }
}
</style>
