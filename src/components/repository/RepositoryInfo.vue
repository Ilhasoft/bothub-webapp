<template>
  <div class="columns">
    <div class="column is-narrow">
      <repository-avatar :name="name" />
    </div>
    <div class="column">
      <div class="repository-header repository-infospace">
        <div class="repository-header-title">
          <router-link
            :to="`/${owner__nickname}/${slug}/`"
            class="title is-4">{{ name }}</router-link>
        </div>
        <div class="repository-header-info">
          <div class="repository-header-info-item">
            <span>0 issues</span>
            <b-icon icon="alert-circle-outline" />
          </div>
          <div class="repository-header-info-item">
            <span>0 stars</span>
            <b-icon icon="star" />
          </div>
        </div>
      </div>
      <div>
        <div class="subtitle is-6 repository-infospace">
          <p>Created by {{ getProfile(owner__nickname).name || owner__nickname }}</p>
          <p><a
            :href="repositoryURL"
            class="has-text-grey"
            target="_blank">{{ repositoryURL }}</a></p>
        </div>
        <div
          v-if="available_languages"
          class="repository-infospace">
          <flags-list :languages="available_languages" />
        </div>
        <div v-if="!hideDescription">
          <p
            v-if="description"
            class="repository-description">{{ description }}</p>
          <p
            v-else
            class="repository-description repository-description-empty">No description</p>
        </div>
        <div v-if="categories_list">
          <repository-categories-list :categories="categories_list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import RepositoryAvatar from '@/components/repository/RepositoryAvatar';
import RepositoryCategoriesList from '@/components/repository/RepositoryCategoriesList';
import FlagsList from '@/components/shared/FlagsList';

const components = {
  RepositoryAvatar,
  RepositoryCategoriesList,
  FlagsList,
};

export default {
  name: 'RepositoryInfo',
  components,
  props: {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner__nickname: {
      type: String,
      required: true,
    },
    available_languages: {
      type: Array,
    },
    description: {
      type: String,
    },
    categories_list: {
      type: Array,
    },
    hideDescription: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.updateProfile({ nickname: this.owner__nickname });
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
    repositoryURL() {
      return `https://bothub.it/${this.owner__nickname}/${this.slug}/`;
    },
  },
  methods: {
    ...mapActions([
      'updateProfile',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.repository {
  &-infospace {
    margin-bottom: .5rem;
  }

  &-description {
    margin: 1.5rem 0;

    &-empty {
      font-style: italic;
    }
  }

  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &-title {
      a {
        font-weight: 500;
        display: inline-block;
        color: $secondary;
        text-decoration: none;
        transition: color .2s ease;

        &:hover {
          color: $link;
        }
      }
    }

    &-info {
      display: flex;
      align-items: center;
      margin-left: 8px;

      &-item {
        display: flex;
        align-items: center;
        color: $grey-light;
        margin-right: 8px;

        &:last-child { margin-right: 0; }

        span {
          padding-right: 8px;
          white-space: nowrap;
        }
      }
    }

    @media screen and (max-width: $tablet) {
      flex-direction: column-reverse;

      &-info {
        margin: 0 0 4px 0;
      }
    }
  }
}
</style>

