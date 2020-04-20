<template>
  <div class="repository-info">
    <div class="repository-info__title">
      <span class="repository-info__title__bagde">
        <router-link :to="repositoryDetailsRouterParams">
          <bh-icon-button
            :value="repositoryInfoIcon"
            class="repository-info__title__bagde__icon" /></router-link>
      </span>
      <router-link :to="repositoryDetailsRouterParams">
        <span class="text-color-fake-black">{{ repository.name }}</span>
      </router-link>
    </div>
    <div class="repository-info__info-item">
      <span>{{ $t('webapp.layout.created_by') }}</span>
      <strong class="medium text-color-primary-light">
        {{ getProfile(repository.owner__nickname).name
        || repository.owner__nickname }}
      </strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'RepositoryInfo',
  components: {
    LanguageBadge,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
    repositoryDetailsRouterParams() {
      return {
        name: 'repository-summary',
        params: {
          ownerNickname: this.repository.owner__nickname,
          slug: this.repository.slug,
        },
      };
    },
    repositoryCategoryRouterParams() {
      if (typeof this.repository.categories[0] === 'object') {
        return this.repository.categories;
      }
      if (typeof this.repository.categories_list[0] === 'object') {
        return this.repository.categories_list;
      }
      return [];
    },
    repositoryInfoIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
@import '~bh/src/assets/scss/colors.scss';


.repository-info {
  text-align: center;

  &__title {
    margin: .30rem 0;
    font-size: 1.25rem;

    &__bagde {
      display: none;
      margin-right: .5rem;
      vertical-align: middle;

      &__icon {
        font-size: 1.5em;
      }

      @media screen and (max-width: $mobile-width) {
        display: inline-block;
      }
    }
  }

  &__info-item {
    color: $color-grey-dark;
  }

  &__flags {
    $margin: .25rem;

    display: flex;
    flex-wrap: wrap;
    margin: 1rem ($margin * -1);

    &__flag {
      order: 0;
      margin: 0 $margin;

      &--main {
        order: -1;
      }
    }
  }

  &__categories {
    margin: .5rem -.25rem;

    &__category {
      margin: .25rem;
    }
  }
}
</style>
