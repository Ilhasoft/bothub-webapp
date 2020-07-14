<template>
  <div>
    <form
      class="create-repository"
      @submit.prevent="onSubmit()">
      <div
        v-show="current==0"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title"> {{ $t('webapp.create_repository.create_repo') }} </h1>
        <p v-html="$t('webapp.create_repository.create_repo_text')" />
        <loading v-if="!formSchema" />
        <form-generator
          v-if="formSchema"
          id="tour-create_intelligence_forms-step-0"
          :drf-model-instance="drfRepositoryModel"
          :is-step-blocked="!checkFormData"
          :schema="filteredSchema"
          v-model="data"
          :errors="errors"
          :show-labels="false"
          class="create-repository__form"/>
        <span
          id="tour-create_intelligence_forms-step-1"
          :is-step-blocked="!nextStepTour">
          <b-button
            :disabled="!checkFormData"
            type="is-primary"
            class="create-repository__form__buttons"
            @click="current = 1, dispatchClick()"> {{ $t('webapp.create_repository.next') }}
          </b-button>
        </span>
      </div>
      <div
        v-show="current==1"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title">
          {{ $t('webapp.create_repository.choose_category') }}
        </h1>
        <p v-html="$t('webapp.create_repository.choose_category_text')" />
        <loading v-if="!formSchema" />
        <category-select
          v-if="formSchema"
          id="tour-create_intelligence_forms-step-2"
          :is-previus-blocked="true"
          v-model="categories"
          :is-step-blocked="categories.length === 0"
          class="create-repository__form"/>
        <div class="create-repository__buttons">
          <b-button
            type="is-primary"
            class="create-repository__form__buttons"
            @click="current = 0"> {{ $t('webapp.create_repository.previous') }}
          </b-button>
          <span
            id="tour-create_intelligence_forms-step-3"
            :is-step-blocked="nextStepTour">
            <b-button
              native-type="submit"
              type="is-primary"
              class="create-repository__form__buttons"
            > {{ $t('webapp.create_repository.submit') }}
            </b-button>
          </span>
        </div>
      </div>
      <div
        v-if="current==2"
        class="create-repository__form__wrapper create-repository__form__final--message">
        <div class="create-repository__form__final--message__wrapper">
          <h1 class="create-repository__title">
            {{ $t('webapp.create_repository.repository_created') }}
          </h1>
          <p v-html="$t('webapp.create_repository.repository_created_text')" />
          <router-link
            id="tour-create_intelligence_forms-step-4"
            :to="repositoryDetailsRouterParams()"
          >
            <b-button
              class="create-repository__form__final--message__button"
              type="is-primary">
              {{ $t('webapp.create_repository.start') }}
            </b-button>
          </router-link>
        </div>
      </div>
      <div class="create-repository__card__wrapper">
        <div class="create-repository__card">
          <repository-card
            v-bind="cardAttributes()"
            :clickable="false"
            single/>
        </div>
      </div>
    </form>
    <tour
      v-if="activeTutorial === 'create_intelligence' && formSchema !== null"
      :step-count="5"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      name="create_intelligence_forms"/>
    <tutorial-modal :open="activeMenu"/>
  </div>
</template>

<script>
import RepositoryCard from '@/components/repository/RepositoryCard';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import { mapActions, mapGetters } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import { getModel } from 'vue-mc-drf-model';
import RepositoryModel from '@/models/newRepository';
import CategorySelect from '@/components/repository/CategorySelect';
import Tour from '@/components/Tour';
import TutorialModal from '@/components/TutorialModal';

export default {
  name: 'CreateRepositoryForm',
  components: {
    Loading,
    FormGenerator,
    RepositoryCard,
    CategorySelect,
    Tour,
    TutorialModal,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formSchema: null,
      data: {},
      submitting: false,
      errors: {},
      drfRepositoryModel: {},
      categories: [],
      current: 0,
      resultParams: {},
      eventClick: false,
      eventClickFinish: false,
      nextStepTour: false,
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
      'activeMenu',
    ]),
    computedSchema() {
      const computed = Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        // eslint-disable-next-line no-param-reassign
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show)) schema[key] = value;
        return schema;
      }, {});
      // eslint-disable-next-line camelcase
      const { is_private, ...schema } = computed;
      // eslint-disable-next-line camelcase
      if (is_private) { return { ...schema, is_private }; }
      return computed;
    },
    filteredSchema() {
      const { categories, ...schema } = this.computedSchema;
      return schema;
    },
    checkFormData() {
      if (this.data.name === '' || this.data.description === ''
        || this.data.language === null || this.data.language === '') {
        return false;
      }
      return true;
    },
  },
  watch: {
    errors() {
      if (Object.keys(this.errors).length > 0) {
        this.current = 0;
        this.$buefy.toast.open({
          message: this.$t('webapp.create_repository.default_error'),
          type: 'is-danger',
        });
      }
    },
  },
  async mounted() {
    console.log();
    this.formSchema = await this.getNewRepositorySchema();
    const Model = getModel(
      this.computedSchema,
      RepositoryModel,
    );
    this.drfRepositoryModel = new Model({},
      null,
      {
        validateOnChange: true,
      });
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
    ]),
    dispatchClick() {
      this.eventClick = !this.eventClick;
      this.nextStepTour = !this.nextStepTour;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    repositoryDetailsRouterParams() {
      return {
        name: 'repository-summary',
        params: {
          ownerNickname: this.resultParams.ownerNickname,
          slug: this.resultParams.slug,
        },
      };
    },
    cardAttributes() {
      const categoryNames = this.categories.length > 0
        ? this.categories.map(category => category.name)
        : [this.$t('webapp.create_repository.category')];

      const categories = this.categories.length > 0
        ? this.categories
        : [{ name: this.$t('webapp.create_repository.category') }];

      return {
        name: this.data.name || this.$t('webapp.create_repository.new_repo'),
        available_languages: [this.data.language || this.$t('webapp.create_repository.language')],
        language: this.data.language || this.$t('webapp.create_repository.language'),
        owner__nickname: this.userName,
        categories,
        categories_list: categoryNames,
        slug: this.$t('webapp.create_repository.new_repo'),
      };
    },
    async onSubmit() {
      this.dispatchFinish();
      const categoryValues = this.categories.map(category => category.id);
      this.drfRepositoryModel = updateAttrsValues(this.drfRepositoryModel,
        { ...this.data, categories: categoryValues });
      this.submitting = true;
      this.errors = {};

      try {
        const response = await this.drfRepositoryModel.save();
        // eslint-disable-next-line camelcase
        const { owner__nickname, slug } = response.response.data;
        this.current = 2;
        this.resultParams = { ownerNickname: owner__nickname, slug };
        return true;
      } catch (error) {
        this.errors = this.drfRepositoryModel.errors;
        this.submitting = false;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.teste{
  border: 1px solid red;
  z-index: 10
}
    .create-repository {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        margin: 4rem 8rem;

        @media (max-width: $mobile-width) {
          flex-direction: row;
        }

        &__buttons {
          margin-right: 1.1rem;
          > * {
            margin-right: 0.75rem;
             &:last-child {
              margin-right: 0;
            }
          }
        }

        &__title {
          color: $color-primary;
          font-size: 3rem;
        }

        &__form {
            text-align: left;
            margin: 3rem 0;

            &__final--message {
              display: flex;
              align-items: center;

              &__wrapper {
                margin: 4rem 0 0 0;
              }

              &__button {
                margin-top: 2rem;
              }
            }

            &__wrapper {
                width: 31rem;
                margin: 0 12rem 0 0;

                @media (max-width: $mobile-width*1.2) {
                  margin: 3rem 0 0 0;
                }
            }

            &__buttons{
              box-shadow: 0px 3px 6px #00000029;
              border-radius: 6px;
              width: 6.875rem;
              height: 2.188rem;
            }
        }

        &__card {
            margin: 4.5rem 0 0 0;
            width: 23.167rem;
            height: 20.668rem;
        }
    }
</style>
