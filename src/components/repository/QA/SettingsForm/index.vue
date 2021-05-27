<template>
  <div class="settings-form">
    <div>
      <unnnic-input
        :label="$t('webapp.create_repository.intelligence_name_label')"
        :placeholder="$t('webapp.create_repository.intelligence_name_placeholder')"
        v-model="intelligence.name"
      />
    </div>
    <div>
      <unnnic-input
        :label="$t('webapp.create_repository.description_label')"
        :placeholder="$t('webapp.create_repository.description_placeholder')"
        v-model="intelligence.description"
      />
    </div>
    <div>
      <unnnic-label :label="$t('webapp.create_repository.language_label')" />
      <unnnic-select
        class="unnic--clickable"
        size="sm"
        :placeholder="$t('webapp.create_repository.language_placeholder')"
        search
        :search-placeholder="$t('webapp.create_repository.language_placeholder_search')"
        v-model="intelligence.language"
      >
        <option v-for="language in languages" :value="language.value" :key="language.id" size="sm">
          {{ language.title }}
        </option>
      </unnnic-select>
    </div>

    <div>
      <unnnic-label :label="$t('webapp.create_repository.category_label')" />
      <unnnic-carousel
        :tagItems="categoryList"
        v-if="categoryList.length > 0"
        @change-selected="selectCategory($event)"
      />
      <loading v-else />
    </div>
    <div>
      <unnnic-label :label="$t('webapp.create_repository.privacy_label')" />
      <div class="settings-form__field">
        <unnnic-card
          clickable
          :title="$t('webapp.create_repository.privacy_type_public_title')"
          :description="$t('webapp.create_repository.privacy_type_public_description')"
          type="content"
          icon="lock-unlock-1-1"
          class="settings-form__field__element"
          :enabled="!intelligence.is_private"
          @click.native="intelligence.is_private = false"
        />

        <unnnic-card
          clickable
          :title="$t('webapp.create_repository.privacy_type_private_title')"
          :description="$t('webapp.create_repository.privacy_type_private_description')"
          type="content"
          icon="lock-2-1"
          class="settings-form__field__element"
          :enabled="intelligence.is_private"
          @click.native="intelligence.is_private = true"
        />
      </div>
    </div>
    <div class="settings-form__field">
      <unnnic-button
        type="terciary"
        class="settings-form__field__element"
        @click.native="dispatchPreviousStep()"
      >
        {{ $t("webapp.create_repository.navigate_to_previous_button") }}
      </unnnic-button>

      <unnnic-button
        type="secondary"
        class="settings-form__field__element"
        @click.native="dispatchCreateRepository()"
      >
        {{ $t("webapp.create_repository.create_intelligence_button") }}
      </unnnic-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LANGUAGES } from '@/utils/index';
import Loading from '@/components/shared/Loading';

export default {
  name: 'settingsForm',
  data() {
    return {
      intelligence: {},
      categoryList: []
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
    }),
    languages() {
      return Object.keys(LANGUAGES).map((lang, index) => ({
        id: index + 1,
        title: LANGUAGES[lang],
        value: lang
      }));
    },
    getEditInitialData() {
      const {
        name,
        slug,
        language,
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities
      } = this.repository;
      return {
        name,
        slug,
        language,
        categories: this.repository.categories_list.map(({ id, name: title }) => ({
          value: id,
          display_name: title
        })),
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities
      };
    },
  },
  mounted() {
    this.getCategories();
    this.getRepositoryData();
  },
  methods: {
    ...mapActions(['getAllCategories', 'getEditRepositorySchema']),
    getRepositoryData(){
      const {
        name,
        slug,
        language,
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities
      } = this.repository;
      this.intelligence = {
        name,
        slug,
        language,
        categories: this.repository.categories_list.map(({ id, name: n }) => ({
          value: id,
          display_name: n
        })),
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities
      }
    },
    selectCategory(category) {
      this.intelligence.categories_list = { ...this.intelligence.categories_list, ...category }
    },
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.editRepository({
          ...this.data,
          ownerNickname: this.ownerNickname,
          repositorySlug: this.slug,
          repositoryUuid: this.$store.state.Repository.selectedRepository.uuid
        });
        this.$emit('edited', response.data);
        this.submitting = false;
        return true;
      } catch (error) {
        const data = error.response && error.response.data;
        if (data) {
          this.errors = data;
        }
        this.submitting = false;
      }

      return false;
    },
    async getCategories() {
      this.loading = true;
      try {
        const { data } = await this.getAllCategories();
        const sortedData = data.sort((previous, next) => previous.id - next.id);
        this.categoryList = sortedData;
      } catch (error) {
        this.$buefy.toast.open({
          message: error,
          type: 'is-danger'
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.settings-form {
  max-height: 80vh;
  overflow: auto;
  border-top: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

  > div {
    margin-top: 1.5rem;
  }

  &__field {
    display: flex;
    justify-content: space-between;

    &__element {
      width: 48%;
    }
  }
}
</style>
