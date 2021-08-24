<template>
    <repository-view-base :repository="repository" :error-code="errorCode">
        <section v-if="repository" class="repository-adjustments">
            <section class="repository-adjustments__description">
                <div class="repository-adjustments__title">
                  <unnnic-card
                      type="title"
                      :title="$t('webapp.home.bases.adjustments')"
                      enabled
                      icon="cog-1"
                      infoPosition="right"
                      :hasInformationIcon="false"
                      scheme="brand-weni-soft"
                  />
                </div>
                 <p class="repository-adjustments__description__text">
                      {{$t('webapp.home.bases.adjustments_subtitle')}}
                  </p>
            </section> <!-- title -->
            <hr />
            <section class="repository-adjustments__wrapper">
              <unnnic-input
                :label="$t('webapp.create_repository.intelligence_name_label')"
                :placeholder="$t('')"
                v-model="intelligence.name"
              />
              <unnnic-input
                :label="$t('webapp.create_repository.description_label')"
                :placeholder="$t('')"
                v-model="intelligence.description"
              />
            </section> <!-- name and description -->
            <section class="repository-adjustments__wrapper__fields">
              <unnnic-label :label="$t('webapp.create_repository.language_label')"/>
              <unnnic-select
                class="unnic--clickable"
                size="sm"
                :placeholder="$t('webapp.create_repository.language_placeholder')"
                v-model="intelligence.language"
                search
                :search-placeholder="$t('webapp.create_repository.language_placeholder_search')"
              >
                <option
                  v-for="(language, key) in languages"
                  :value="key"
                  :key="key"
                  size="sm"
                >
                {{language}}
                </option>
              </unnnic-select>
            </section> <!-- language -->
            <section class="repository-adjustments__wrapper__fields">
              <unnnic-label :label="$t('webapp.create_repository.category_label')" />
              <unnnic-carousel
                :tagItems="categoryList"
                v-if="categoryList.length > 0"
                @change-selected="selectCategory($event)"
                v-model="intelligence.categories"
              />
              <loading v-else />
            </section> <!-- categories -->
            <section class="repository-adjustments__privacy">
                <unnnic-label :label="$t('webapp.create_repository.privacy_label')" />
                <div class="repository-adjustments__privacy__cards">
                    <unnnic-card
                        clickable
                        :title="$t('webapp.create_repository.privacy_type_public_title')"
                        :description="
                        $t('webapp.create_repository.privacy_type_public_description')"
                        type="content"
                        icon="lock-unlock-1-1"
                        class="repository-adjustments__privacy__cards__content"
                        :enabled="!intelligence.is_private"
                        @click.native="intelligence.is_private = false"
                    />
                    <unnnic-card
                        clickable
                        :title="$t('webapp.create_repository.privacy_type_private_title')"
                        :description="
                        $t('webapp.create_repository.privacy_type_private_description')"
                        type="content"
                        icon="lock-2-1"
                        class="repository-adjustments__privacy__cards__content"
                        :enabled="intelligence.is_private"
                        @click.native="intelligence.is_private = true"
                    />
                </div>
            </section> <!-- privacy -->
            <section class="repository-adjustments__wrapper__buttons">
               <unnnic-button
              type="terciary"
              size="large"
              :text="$t('webapp.home.bases.adjustments_button_back')"
              class="repository-adjustments__buttons"
              >
              </unnnic-button>
              <unnnic-button
              type="secondary"
              size="large"
              :text="$t('webapp.home.bases.adjustments_button')"
              @click="onSubmit()"
              :loading="submitting"
              class="repository-adjustments__buttons"
              >
              </unnnic-button>
            </section>
        </section>
        <modal
        v-if="isSavedModalOpen"
        type="alert"
        :data="{scheme:'feedback-green', icon:'check-circle-1-1',
        title:$t('webapp.home.bases.adjustuments_modal_title'),
        description: $t('webapp.home.bases.adjustments_modal_description')}"
        @close="isSavedModalOpen = false"
        />
    </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';
import { mapActions } from 'vuex';
import { LANGUAGES } from '@/utils/index';
import Loading from '@/components/shared/Loading';
import Modal from '@/components/repository/CreateRepository/Modal'

export default {
  name: 'RepositoryContentAdjustment',
  data(){
    return {
      intelligence: {
        name: '',
        description: '',
        repository_type: '',
        is_private: false,
        language: '',
        categories: [],
      },
      categoryList: [],
      languages: LANGUAGES,
      submitting: false,
      errors: {},
      isSavedModalOpen: false
    }
  },
  components: {
    RepositoryViewBase,
    Loading,
    Modal
  },
  extends: RepositoryBase,
  watch: {
    // eslint-disable-next-line
    'repository.is_private' (){
      this.intelligence.is_private = this.repository.is_private;
    },
    // eslint-disable-next-line
    'repository.name' (){
      this.intelligence.name = this.repository.name;
    },
    // eslint-disable-next-line
    'repository.description' (){
      console.log(this.repository)
      this.intelligence.description = this.repository.description;
    },
    // eslint-disable-next-line
    'repository.repository_type' (){
      this.intelligence.repository_type = this.repository.repository_type;
    },
    // eslint-disable-next-line
    'repository.language' (){
      this.intelligence.language = this.repository.language;
    },
    // eslint-disable-next-line
    'repository.categories' (){
      this.intelligence.categories = this.repository.categories;
    }
  },
  methods: {
    ...mapActions(['getAllCategories', 'editRepository']),
    selectCategory(category) {
      this.intelligence.categories = category;
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
    },
    async onSubmit() {
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.editRepository({
          ...this.intelligence,
          repositoryUuid: this.repository.uuid,
        });
        this.submitting = false;
        this.isSavedModalOpen = true;
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
    closeModal(){
      this.open = false;
    }
  },
  mounted() {
    this.getCategories();
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-adjustments {

  &__title {
    font-size: 1.75rem;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    font-family: $font-family;
    color: $color-fake-black;
  }

  &__privacy {
    margin-bottom: 2rem;

    &__cards {
      display: flex;
      justify-content: space-between;
      &__content {
        width: 47%;
      }
    }
  }
  &__wrapper {
    &__fields {
      margin-bottom: 2rem;
    }
  }
  &__description{
    &__text{
      font-family: Lato, sans-serif;;
      font-weight: 400;
      line-height: 1.375rem;
      font-size: .875rem;
      color: #67738b;
      margin-top: 8px;
      ul li {
        list-style-type: disc;
      }
    }
  }
  &__wrapper{
      &__buttons{
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
  }
  &__buttons{
    width: 47%;
  }
}
</style>
