<template>
  <div class="bh-grid">
    <div class="bh-grid__item bh-grid__item--grow-0 repository-info__big-badge-wrapper">
      <div class="repository-info__big-badge">
        <router-link :to="repositoryDetailsRouterParams">
          <bh-icon-button
            size="medium"
            value="botinho"
            class="repository-info__big-badge__icon" /></router-link>
      </div>
    </div>
    <div class="bh-grid__item">
      <div class="repository-info__title">
        <span class="repository-info__title__bagde">
          <router-link :to="repositoryDetailsRouterParams">
            <bh-icon-button
              value="botinho"
              class="repository-info__title__bagde__icon" /></router-link>
        </span>
        <router-link :to="repositoryDetailsRouterParams">
        <span class="text-color-bolder-grey">{{ repository.name }}</span></router-link>
      </div>
      <div class="repository-info__info-item">
        <router-link :to="repositoryDetailsRouterParams">{{ repository.absolute_url
        || `/${repository.owner__nickname}/${repository.slug}/` }}</router-link>
      </div>
      <div class="repository-info__info-item">
        <span>Created by</span>
        <strong class="medium">{{ getProfile(repository.owner__nickname).name
        || repository.owner__nickname }}</strong>
      </div>
      <div class="repository-info__flags">
        <span
          v-for="language in repository.available_languages"
          :key="language"
          :class="{
            'repository-info__flags__flag': true,
            'repository-info__flags__flag--main': language == repository.language,
        }">
          <bh-language-flag
            :language="language"
            size="small" />
        </span>
      </div>
      <div class="repository-info__categories">
        <router-link
          v-for="category in repositoryCategoryRouterParams"
          :key="category.id"
          :to="{
            path: '/',
            query: { category: category.id },
        }">
          <bh-badge
            color="lighter-grey"
            class="repository-info__categories__category">{{ category.name }}</bh-badge>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'RepositoryInfo',
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
        name: 'repository-home',
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
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/variables.scss';
@import '~bh/src/assets/scss/colors.scss';


.repository-info {
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
    background-color: #009688;
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
    color: $color-grey;
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
