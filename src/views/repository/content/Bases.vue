<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <div v-if="repository" class="repository-base">
      <div class="repository-base__description">
        <div class="repository-base__title">
            <unnnic-card
            type="title"
            :title="$t('webapp.home.description')"
            enabled
            icon="paginate-filter-text-1"
            infoPosition="right"
            :hasInformationIcon="false"
            scheme="aux-orange"
          />
        </div>
        <div>
          <vue-markdown
            :source="repository.description"
            show
            html
            :breaks="false"
            :linkify="false"
            emoji
            typographer
            toc
            toc-id="toc"
            class="repository-base__description__text markdown-body"
          />
          <p v-if="repository.description" class="repository-base__description__text" />
          <p v-else>
            <i class="text-color-grey-dark">{{ $t("webapp.home.no_description") }}</i>
          </p>
        </div>
        <div class="repository-base__description__header">
          <div>
            <b-tag
              v-for="(category, index) in getAllCategories"
              :key="index"
              class="repository-base__header__tag"
              rounded
            >
              {{ category }}
            </b-tag>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <unnnic-card
            type="title"
            :title="$t('webapp.home.bases.knowledge_bases')"
            enabled
            icon="book-address-1-2"
            infoPosition="right"
            :hasInformationIcon="false"
            scheme="aux-pink"
          />
          <p class="repository-base__description__text">
            {{ $t("webapp.home.bases.description") }}
          </p>
      </div>
      <div class="repository-base__cards">
        <unnnic-card
          clickable
          :text="$t('webapp.home.bases.new_knowledge_base')"
          type="blank"
          icon="add-1"
          class="repository-base__cards__new"
          @click.native="createNewBase()"
        />
        <home-repository-card
          type="base"
          v-for="base in bases"
          :key="base.id"
          :repository-detail="base"
        />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import VueMarkdown from 'vue-markdown';
import RepositoryBase from '../Base';
import HomeRepositoryCard from '@/components/repository/home/HomeRepositoryCard';

export default {
  name: 'RepositoryBase',
  components: {
    RepositoryViewBase,
    VueMarkdown,
    HomeRepositoryCard,
  },
  extends: RepositoryBase,
  data() {
    return {
      repositoryUUID: null,

      bases: [],
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'getProjectSelected',
      'getOrgSelected']),

    getAllCategories() {
      if (!this.repository.categories_list) {
        return [];
      }

      const categories = this.repository.categories_list.map(category => category.name);
      return categories;
    }
  },
  watch: {
    // eslint-disable-next-line
    'repository.uuid'() {
      if (!this.repository.uuid || this.repository.uuid === 'null') {
        return false;
      }

      this.repositoryUUID = this.repository.uuid;
    },

    async repositoryUUID() {
      const response = await this.getQAKnowledgeBases({
        repositoryUUID: this.repositoryUUID,
        page: 0,
      });

      response.data.results.forEach(({ id, title, user_name, language_count, description }) => {
        this.bases.push({
          id,
          name: title,
          owner__nickname: user_name,
          available_languages: new Array(language_count),
          description,
        });
      });
    },
  },
  methods: {
    ...mapActions(['getQAKnowledgeBases']),

    createNewBase(){
      this.$router.push({
        name: 'repository-content-bases-new'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-base {
  &__title {
    font-size: 1.75rem;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    font-family: $font-family;
    color: $color-fake-black;

    div {
      margin: 0 0 0.2rem 0.2rem;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 1rem;

    &__tag {
      margin: 0.8rem 0.5rem 2.188rem 0;
      padding: 0 2rem;
      font-size: 15px;
    }
  }

  &__description {
    padding: 0 0.5rem;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__text {
      margin-top: 8px;
      ul li {
        list-style-type: disc;
      }
    }
  }
  &__cards {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 24%);
    margin-top: 24px;
    @media screen and (max-width: 1400px) {
      grid-template-columns: repeat(3, 32%);
    }

    &__new {
      height: 16.8125rem;
      margin-bottom: $unnnic-inline-sm;
    }
  }

}
.tooltipStyle::after {
  font-size: 12px;
  line-height: 13px;
  padding: 1rem 0.5rem;
  font-family: $font-family;
}
.markdown-body {
  a {
    color: $color-primary;
    text-decoration: none;
  }

  hr {
    background: $color-primary;
    height: 2px;
  }

  h1,
  h2 {
    border-bottom: 1px solid $color-primary;
  }
}
</style>
