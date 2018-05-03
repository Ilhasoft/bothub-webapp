<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-narrow">
          <repository-avatar :name="name" />
        </div>
        <div class="column">
          <div class="level repository-infospace">
            <div class="level-left">
              <div class="level-item">
                <router-link
                  :to="`/${owner__nickname}/${slug}/`"
                  class="repository-title title is-4">{{ name }}</router-link>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item repository-status">
                <span>0 issues</span>
                <b-icon icon="alert-circle-outline" />
              </div>
              <div class="level-item repository-status">
                <span>0 stars</span>
                <b-icon icon="star" />
              </div>
            </div>
          </div>
          <div>
            <div class="subtitle is-6 repository-infospace">Created by
              {{ getProfile(owner__nickname).name || owner__nickname }}</div>
            <div class="repository-infospace">
              <flags-list :languages="available_languages" />
            </div>
            <p
              v-if="description"
              class="repository-description">{{ description }}</p>
            <p
              v-else
              class="repository-description repository-description-empty">No description</p>
            <repository-categories-list :categories="categories_list" />
          </div>
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
  name: 'RepositoryCard',
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
    },
    categories_list: {
      type: Array,
      default: () => ([]),
    },
  },
  components,
  mounted() {
    this.updateProfile({ nickname: this.owner__nickname });
  },
  computed: {
    ...mapGetters([
      'getProfile',
    ]),
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

.card {
  margin: 1rem 0;
}

.repository {
  &-title {
    font-weight: 500;
    display: inline-block;
    color: $secondary;
    text-decoration: none;
    transition: color .2s ease;

    &:hover {
      color: $link;
    }
  }

  &-status {
    display: flex;
    align-items: center;
    color: $grey-light;

    > * {
      margin-right: 4px;

      &:last-child { margin-right: 0; }
    }
  }

  &-infospace {
    margin-bottom: .5rem;
  }

  &-description {
    margin: 1.5rem 0;

    &-empty {
      font-style: italic;
    }
  }
}
</style>

