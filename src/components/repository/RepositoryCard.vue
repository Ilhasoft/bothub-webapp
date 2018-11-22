<template>
  <bh-card
    shadow="light"
    class="repository-card">
    <div class="bh-grid bh-grid--column repository-card__align-items">
      <div class="bh-grid__item bh-grid__item--grow-0 repository-card__big-badge-wrapper">
        <div class="repository-card__big-badge">
          <router-link :to="repositoryDetailsRouterParams">
            <bh-icon-button
              size="medium"
              value="botinho"
              class="repository-card__big-badge__icon" /></router-link>
        </div>
      </div>
      <div class="bh-grid__item text-center">
        <div class="repository-card__title">
          <span class="repository-card__title__bagde">
            <router-link :to="repositoryDetailsRouterParams">
              <bh-icon-button
                value="botinho"
                class="repository-card__title__bagde__icon" /></router-link>
          </span>
          <router-link :to="repositoryDetailsRouterParams">
          <span class="text-color-fake-black">{{ $attrs.name }}</span></router-link>
        </div>

        <div class="repository-card__info-item">
          <span>Created by</span>
          <span class="medium text-color-primary">{{ getProfile($attrs.owner__nickname).name
          || $attrs.owner__nickname }}</span>
        </div>
        <div class="repository-card__flags">
          <span
            v-for="language in $attrs.available_languages"
            :key="language"
            :class="{
              'repository-card__flags__flag': true,
              'repository-card__flags__flag--main': language == $attrs.language,
          }">
            <bh-language-flag
              :language="language"
              size="small" />
          </span>
        </div>
        <div class="repository-card__categories">
          <router-link
            v-for="category in repositoryCategoryRouterParams"
            :key="category.id"
            :to="{
              path: '/',
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


export default {
  name: 'RepositoryCard',
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
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
@import '~bh/src/assets/scss/colors.scss';


.repository-card {
  margin: 1rem;
  padding: 1rem 0;
  width: calc(90% / 3);

   @media screen and (max-width: $mobile-width) {
    width: 100%;
  }

  &__align-items {
    align-items: center;
  }

  &__big-badge-wrapper {
    display: block;

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
    background-color: $color-primary-darker;
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
    margin: .5rem -.25rem;

    &__flag {
      display: inline-block;
      margin: .25rem;
      padding: 0 .25rem .25rem;
      border-bottom: .25rem solid transparent;

      &--main {
        border-color: $color-primary;
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
