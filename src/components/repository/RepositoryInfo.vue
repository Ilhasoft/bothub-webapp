<template>
  <div class="columns">
    <div class="column is-narrow">
      <repository-avatar
        :name="name"
        :owner-nickname="owner__nickname"
        :slug="slug"
        :votes-sum="votes_sum" />
    </div>
    <div class="column">
      <div class="repository-header repository-infospace">
        <div class="repository-header-title">
          <router-link
            :to="`/${owner__nickname}/${slug}/`"
            class="title is-4">{{ name }}</router-link>
        </div>
        <div class="repository-header-info">
          <button
            v-if="showManagerAuthorizationAction"
            class="action repository-header-info-item"
            @click="$emit('managerAuthorization')">
            <b-icon icon="account-plus" />
          </button>
          <button
            v-if="showTrainAction"
            :disabled="training"
            class="action repository-header-info-item"
            @click="$emit('train')">
            <b-icon
              :icon="training ? 'refresh' : 'school'"
              :custom-class="training && 'icon-spin' || null" />
          </button>
          <button
            v-if="showEditAction"
            class="action repository-header-info-item"
            @click="$emit('edit')">
            <b-icon icon="pencil" />
          </button>
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
          <div class="repository-infospace-flags">
            <bh-language-flag
              v-for="language in available_languages"
              :key="language"
              :language="language"
              class="repository-infospace-flags-item" />
          </div>
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
      default: () => ([]),
    },
    description: {
      type: String,
      default: '',
    },
    categories_list: {
      type: Array,
      default: () => ([]),
    },
    hideDescription: {
      type: Boolean,
      default: false,
    },
    showManagerAuthorizationAction: {
      type: Boolean,
      default: false,
    },
    showTrainAction: {
      type: Boolean,
      default: false,
    },
    showEditAction: {
      type: Boolean,
      default: false,
    },
    training: {
      type: Boolean,
      default: false,
    },
    votes_sum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
    repositoryURL() {
      return `https://bothub.it/${this.owner__nickname}/${this.slug}/`;
    },
  },
  mounted() {
    this.updateProfile({ nickname: this.owner__nickname });
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

    &-flags {
      $margin: .25rem;

      margin: -($margin);

      &-item {
        margin: $margin;
      }
    }
  }

  &-description {
    margin: .75rem 0;

    &-empty {
      font-style: italic;
    }
  }

  &-header {
    display: flex;
    align-items: center;
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

      &-item.action {
        box-shadow: 1px 1px 3px rgba(100, 100, 100, .5);
        color: $primary;
        border-radius: 4px;
        border: none;
        background-color: white;
        cursor: pointer;
        outline: none;

        &:hover {
          box-shadow: 1px 1px 4px rgba(100, 100, 100, .7);
        }

        &:disabled {
          color: $grey-light;
          cursor: not-allowed;
        }
      }

      &-item {
        display: flex;
        align-items: center;
        color: $grey-light;
        margin-right: 8px;
        padding: 4px;

        &:last-child { margin-right: 0; }

        span {
          padding-right: 8px;
          white-space: nowrap;

          &:last-child {
            padding-right: 0;
          }
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
