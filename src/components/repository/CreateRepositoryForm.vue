<template>
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
        :drf-model-instance="drfRepositoryModel"
        :schema="filteredSchema"
        v-model="data"
        :errors="errors"
        :show-labels="false"
        class="create-repository__form" />
      <b-button
        type="is-primary"
        @click="current = 1"> {{ $t('webapp.create_repository.next') }} </b-button>
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
        v-model="categories"
        class="create-repository__form"/>
      <b-button
        type="is-primary"
        @click="current = 0"> {{ $t('webapp.create_repository.previous') }} </b-button>
      <b-button
        native-type="submit"
        type="is-primary"> {{ $t('webapp.create_repository.submit') }} </b-button>
    </div>
    <div
      v-if="current==2"
      class="create-repository__form__wrapper">
      <h1 class="create-repository__title">
        {{ $t('webapp.create_repository.repository_created') }}
      </h1>
      <p v-html="$t('webapp.create_repository.repository_created_text')" />
      <router-link :to="repositoryDetailsRouterParams()">
        <b-button
          type="is-primary"> {{ $t('webapp.create_repository.start') }} </b-button>
      </router-link>
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
</template>

<script>
import RepositoryCard from '@/components/repository/RepositoryCard';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import { mapActions } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import { getModel } from 'vue-mc-drf-model';
import RepositoryModel from '@/models/newRepository';
import CategorySelect from '@/components/repository/CategorySelect';

export default {
  name: 'CreateRepositoryForm',
  components: {
    Loading,
    FormGenerator,
    RepositoryCard,
    CategorySelect,
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
    };
  },
  computed: {
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

    .create-repository {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        margin: 4rem 8rem;

        @media (max-width: $mobile-width) {
          flex-direction: row;
        }

        &__title {
          color: $color-primary;
          font-size: 3rem;
        }

        &__form {
            text-align: left;
            margin: 3rem 0;

            &__wrapper {
                width: 31rem;
                margin: 0 12rem 0 0;

                @media (max-width: $mobile-width*1.2) {
                  margin: 3rem 0 0 0;
                }
            }
        }

        &__card {
            margin: 3rem 0 0 0;
            width: 23.3rem;
            height: 23.3rem;
        }
    }
</style>
