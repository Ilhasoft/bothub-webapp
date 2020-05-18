<template>
  <bh-card
    shadow="light"
    class="repository-card"
    no-border>
    <div class="repository-card__align-items">
      <div class="repository-card__big-badge-wrapper">
        <router-link :to="repositoryDetailsRouterParams">
          <div class="repository-card__big-badge">
            <bh-icon-button
              :value="repositoryIcon"
              size="extra-large"
              class="repository-card__big-badge__icon" />
          </div>
        </router-link>
      </div>
      <div class="repository-card__details">
        <div class="repository-card__title">
          <span class="repository-card__title__bagde">
            <router-link :to="repositoryDetailsRouterParams">
              <bh-icon-button
                :value="repositoryIcon"
                class="repository-card__title__bagde__icon" /></router-link>
          </span>
          <router-link :to="repositoryDetailsRouterParams">
          <span class="text-color-fake-black">{{ $attrs.name }}</span></router-link>
        </div>

        <div class="repository-card__info-item">
          <span>{{ $t('webapp.layout.created_by') }}</span>
          <strong class="medium text-color-primary">{{ getProfile($attrs.owner__nickname).name
          || $attrs.owner__nickname }}</strong>
        </div>
        <div class="repository-card__flags bh-grid bh-grid--row">
          <span
            v-for="language in $attrs.available_languages"
            :key="language"
            :class="{
              'repository-card__flags__flag': true,
              'repository-card__flags__flag--main': language == $attrs.language,
          }">
            <language-badge
              :language="language"
              :main="language == $attrs.language" />
          </span>
        </div>
        <div class="repository-card__categories">
          <router-link
            v-for="category in repositoryCategoryRouterParams"
            :key="category.id"
            :to="{
              path: '/home',
              query: { category: category.id },
          }">
            <bh-badge
              color="grey-light"
              size="small"
              class="repository-card__categories__category">{{ category.name }}</bh-badge>
          </router-link>
        </div>
      </div>
    </div>
  </bh-card>
</template>

<script>
import { mapGetters } from 'vuex';
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'RepositoryCard',
  components: {
    LanguageBadge,
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
    repositoryDetailsRouterParams() {
      return {
        name: 'repository-summary',
        params: {
          ownerNickname: this.$attrs.owner__nickname,
          slug: this.$attrs.slug,
        },
      };
    },
    repositoryCategoryRouterParams() {
      if (typeof this.$attrs.categories[0] === 'object') {
        return this.$attrs.categories;
      }
      if (typeof this.$attrs.categories_list[0] === 'object') {
        return this.$attrs.categories_list;
      }
      return [];
    },
    repositoryIcon() {
      return (this.$attrs.categories[0] && this.$attrs.categories[0].icon) || 'botinho';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
@import '~bh/src/assets/scss/colors.scss';


.repository-card {
  $repository-card-margin: .5rem;

  margin: $repository-card-margin 0 $repository-card-margin auto;
  padding: 1rem 0;
  width: calc(100% * 1/3 - 1rem);
  word-break: break-all;

  @media screen and (max-width: $mobile-width) {
    width: calc(100% * 1/2 - 1rem);
  }

  @media screen and (max-width: $small-mobile-width) {
    width: calc(100% - 1rem);
  }

  &__align-items {
    align-items: center;
    display: flex;
    padding: 0.25rem;
    flex-direction: column;
  }

  &__details {
    text-align: center;
    padding: 0.5rem;
  }

  &__big-badge-wrapper {
    display: block;
    margin: 0.5rem;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }

  &__big-badge {
    $size: 6rem;

    position: relative;
    display: block;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: $color-primary-dark;
    overflow: hidden;

    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: $font-weight-bolder;
    margin-bottom: .5rem;

    &__bagde {
      display: none;
      vertical-align: middle;
      margin-right: .5rem;

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
    display: flex;
    flex-wrap: wrap;
    margin: .5rem -.25rem;
    justify-content: center;
    align-items: center;

    &__flag {
      margin: .25rem;
      order: 0;

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
