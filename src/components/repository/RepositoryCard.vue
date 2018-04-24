<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-narrow">
          <div class="repository-left">
            <div class="repository-left-updownvote">
              <button class="repository-left-updownvote-btn">
                <b-icon icon="chevron-up" />
              </button>
              <div class="repository-left-updownvote-value">0</div>
              <button class="repository-left-updownvote-btn">
                <b-icon icon="chevron-down" />
              </button>
            </div>
            <div class="repository-left-avatar">
              <img src="@/assets/imgs/avatar.png" :alt="repository.name" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="level repository-infospace">
            <div class="level-left">
              <div class="level-item">
                <a class="repository-title title is-4">{{ repository.name }}</a>
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
              {{ getProfile(repository.owner__nickname).name || repository.owner__nickname }}</div>
            <div class="repository-infospace">
              <flags-list :languages="repository.available_languages" />
            </div>
            <p
              v-if="repository.description"
              class="repository-description">{{ repository.description }}</p>
            <p
              v-else
              class="repository-description repository-description-empty">No description</p>
            <repository-categories-list :categories="repository.categories_list" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RepositoryCategoriesList from '@/components/repository/RepositoryCategoriesList';
import FlagsList from '@/components/shared/FlagsList';

const components = {
  RepositoryCategoriesList,
  FlagsList,
};

export default {
  name: 'RepositoryCard',
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  components,
  mounted() {
    this.updateProfile({ nickname: this.repository.owner__nickname });
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

.repository {
  &-left {
    display: flex;
    align-items: center;
    justify-content: center;

    &-updownvote {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      align-self: center;

      &-value {
        width: 100px;
        font-size: 20px;
        padding: 5px 10px;
        border-radius: 20px 0 0 20px;
        color: #AEAEAE;
        text-align: center;
        background-color: #F2F2F2;
        box-shadow: inset 0 2px 6px -2px #929292;

        &-active {
          background-color: #0f0;
          box-shadow: inset 0 2px 6px 0 #1b756a;
          color: #FFF;
        }
      }

      &-btn {
        color: #0a0;
        font-size: 30px;
        background-color: transparent;
        border: 0;
        outline: none;
        cursor: pointer;

        @media (max-width: $desktop) {
          width: 30px;
          height: 40px;
          text-align: center;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    &-avatar {
      width: 134px;
      height: 134px;
      margin: 0 0 0 -10px;
      overflow: hidden;
      border-radius: 100%;
      position: relative;
      z-index: 2;

      @media (max-width: $desktop) {
        width: 100px;
        height: 100px;
      }
    }
  }

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

