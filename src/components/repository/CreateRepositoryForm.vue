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
        <div
          id="tour-create_intelligence_forms-step-0"
          :is-next-disabled="true"
          class="create-repository__container">
          <form-generator
            v-if="formSchema"
            :drf-model-instance="drfRepositoryModel"
            :is-step-blocked="!checkFormData"
            :schema="filteredSchema"
            v-model="data"
            :errors="errors"
            :show-labels="false"
            :new-intelligence-forms="true"
            class="create-repository__form"/>
          <div
            class="create-repository__form__style">
            <b-button
              :disabled="!checkFormData"
              type="is-primary"
              class="create-repository__form__style__button"
              @click="current = 1, dispatchClick()"> {{ $t('webapp.create_repository.next') }}
            </b-button>
          </div>
        </div>
      </div>
      <div
        v-show="current==1"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title">
          {{ $t('webapp.create_repository.choose_category') }}
        </h1>
        <p v-html="$t('webapp.create_repository.choose_category_text')" />
        <loading v-if="!formSchema" />
        <div
          id="tour-create_intelligence_forms-step-1"
          :is-finish-disabled="true"
          :is-previous-disabled="true"
          :class="activeTutorial === 'create_intelligence'
          ? 'create-repository__form__tutorial' : ''">
          <category-select
            v-if="formSchema"
            v-model="categories"
            :is-step-blocked="categories.length === 0"
            class="create-repository__form"/>
          <div class="create-repository__buttons">
            <b-button
              :disabled="activeTutorial === 'create_intelligence'"
              type="is-primary"
              class="create-repository__form__buttons"
              @click="current = 0"> {{ $t('webapp.create_repository.previous') }}
            </b-button>
            <span
              :class="activeTutorial === 'create_intelligence'
              ? 'create-repository__form__finishButton' : ''">
              <b-button
                :disabled="categories.length === 0"
                native-type="submit"
                type="is-primary"
                class="create-repository__form__buttons"
              > {{ $t('webapp.create_repository.submit') }}
              </b-button>
            </span>
          </div>
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
      :step-count="2"
      :next-event="eventClick"
      :finish-event="eventClickFinish"
      :skip-if-back-page="eventClickBackPage"
      name="create_intelligence_forms"/>
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

export default {
  name: 'CreateRepositoryForm',
  components: {
    Loading,
    FormGenerator,
    RepositoryCard,
    CategorySelect,
    Tour,
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
      noOrgModel: {},
      categories: [],
      current: 0,
      resultParams: {},
      eventClick: false,
      eventClickFinish: false,
      blockedNextStepTutorial: false,
      eventClickBackPage: false,
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
      'activeMenu',
      'myProfile',
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
      const orgField = {
        label: this.$t('webapp.orgs.owner'),
        fetch: this.getOrgs,
        type: 'choice',
      };
      // eslint-disable-next-line camelcase
      if (is_private) { return { ...schema, orgField, is_private }; }
      return computed;
    },
    filteredSchema() {
      const { categories, ...schema } = this.computedSchema;
      const { description } = schema;
      description.type = 'textarea';
      description.label = this.$t('webapp.create_repository.description_form');
      const formattedSchema = { ...schema, description };
      return formattedSchema;
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
    this.formSchema = await this.getNewRepositorySchema();
    this.constructModels();
  },
  beforeDestroy() {
    this.checkIfIsTutorial();
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
      'setTutorialInactive',
      'clearTutorial',
      'clearFinalizatioMessage',
      'setFinalModal',
      'getAllOrgs',
    ]),
    constructModels() {
      const Model = getModel(
        this.computedSchema,
        RepositoryModel,
      );
      this.drfRepositoryModel = new Model({},
        null,
        {
          validateOnChange: true,
        });
      const { organization, ...schema } = this.computedSchema;
      const NoOrgModel = getModel(
        schema,
        RepositoryModel,
      );
      this.noOrgModel = new NoOrgModel({},
        null,
        {
          validateOnChange: true,
        });
    },
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    dispatchFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    checkIfIsTutorial() {
      if (this.activeTutorial === 'create_intelligence') {
        this.setTutorialInactive();
      }
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
    async getOrgs() {
      this.loading = true;
      const list = await this.getAllOrgs();
      await list.getAllItems();
      const options = list.items.map(org => ({
        label: org.name,
        value: org,
      }));
      return [
        { value: null, label: `${this.myProfile.name} (${this.$t('webapp.orgs.my_user')})` },
        ...options,
      ];
    },
    cardAttributes() {
      const categoryNames = this.categories.length > 0
        ? this.categories.map(category => category.name)
        : [this.$t('webapp.create_repository.category')];

      const categories = this.categories.length > 0
        ? this.categories
        : [{ name: this.$t('webapp.create_repository.category') }];

      const organization = this.data.organization ? this.data.organization.name : null;

      return {
        name: this.data.name || this.$t('webapp.create_repository.new_repo'),
        available_languages: [this.data.language || this.$t('webapp.create_repository.language')],
        language: this.data.language || this.$t('webapp.create_repository.language'),
        owner__nickname: organization || this.userName,
        categories,
        categories_list: categoryNames,
        slug: this.$t('webapp.create_repository.new_repo'),
      };
    },
    onSubmit() {
      this.submit(this.data.organization ? this.drfRepositoryModel : this.noOrgModel);
    },
    async submit(model) {
      const categoryValues = this.categories.map(category => category.id);
      const { organization, ...data } = this.data;
      const updatedModel = updateAttrsValues(model,
        {
          ...data,
          organization: organization ? organization.id : null,
          categories: categoryValues,
        });
      this.submitting = true;
      this.errors = {};

      try {
        const response = await updatedModel.save();
        // eslint-disable-next-line camelcase
        const { owner__nickname, slug } = response.response.data;
        this.current = 2;
        this.resultParams = { ownerNickname: owner__nickname, slug };
        await this.clearTutorial();
        await this.clearFinalizatioMessage();
        await this.setFinalModal(false);
        if (this.activeTutorial === 'create_intelligence') {
          this.dispatchFinish();
        }
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

    .create-repository {
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin: 4rem 8rem;

        @media (max-width: $mobile-width * 1.5) {
          flex-direction: column;
          align-items: center;
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

        &__container{
          margin: 0;
          padding: 0 0 1rem 0;
          width: 30.625rem;
        }
        &__form {
            text-align: left;
            margin: 3rem 0;
            width: 30.400rem;
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

            &__tutorial{
              margin: 0;
              padding: 0;
              height: 430px;
              width: 480px;
            }
            &__wrapper {
                width: 32rem;
                @media (max-width: $mobile-width*1.2) {
                    padding: 0 3rem ;
                }
            }
            &__finishButton{
              border-radius: 6px;
            }
            &__buttons{
              box-shadow: 0px 3px 6px #00000029;
              border-radius: 6px;
              width: 6.875rem;
              height: 2.188rem;
              @media (max-width: $mobile-width*1.2) {
                 margin-top: 7rem;
                }
            }

            &__style{
              margin: 3rem auto 0;
              width: 6.875rem;
              height: 2.188rem;
              border-radius: 6px;
              @media (max-width: $mobile-width*1.2) {
                   margin-top: 6rem;
              }
              &__button{
                box-shadow: 0px 3px 6px #00000029;
                border-radius: 6px;
                width: 6.875rem;
                height: 2.188rem;
              }
            }
        }

        &__card {
            margin: 4.5rem 0 0 0;
            width: 23.167rem;
            height: 20.668rem;
        }
    }
</style>
