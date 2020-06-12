<template>
  <layout>
    <div class="create-repository">
      <div
        v-show="current==0"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title"> Create an intelligence </h1>
        <p> Now you can create intelligence quickly and easily.
        Let's start now? First, give your repository a name. <br>
          Then choose the language in which he will be trained.
          Finally, determine whether it will be open to the public or private. </p>
        <loading v-if="!formSchema" />
        <form-generator
          v-if="formSchema"
          :drf-model-instance="drfRepositoryModel"
          :schema="filteredSchema"
          v-model="data"
          :errors="errors"
          class="create-repository__form" />
        <b-button
          type="is-primary"
          @click="current = 1"> Next </b-button>
      </div>
      <div
        v-show="current==1"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title"> Repository categories </h1>
        <p> Choose the categories your repository fits into. <br>
          Don't worry, you can change them later. </p>
        <loading v-if="!formSchema" />
        <category-list
          v-if="formSchema"
          v-model="categories"
          :list="categoriesList.choices"
          class="create-repository__form"/>
        <b-button
          type="is-primary"
          @click="current = 0"> Previous </b-button>
        <b-button
          type="is-primary"
          @click="onSubmit"> Submit </b-button>
      </div>
      <div
        v-if="current==2"
        class="create-repository__form__wrapper">
        <h1 class="create-repository__title"> We're all ready! </h1>
        <p> Your repository is ready to use. You can change this
        and other information on the settings tab. <br>
          You can now start training your bot! </p>
        <router-link :to="repositoryDetailsRouterParams()">
          <b-button
            type="is-primary"> Start </b-button>
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
  </div></layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import RepositoryCard from '@/components/repository/RepositoryCard';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import NewRepositoryForm from '@/components/repository/NewRepositoryForm';
import { mapActions, mapGetters } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import { getModel } from 'vue-mc-drf-model';
import RepositoryModel from '@/models/newRepository';
import CategoryList from '@/components/repository/CategoryList';

export default {
  name: 'CreateRepository',
  components: {
    Loading,
    FormGenerator,
    Layout,
    RepositoryCard,
    NewRepositoryForm,
    CategoryList,
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
    ...mapGetters([
      'myProfile',
    ]),
    computedSchema() {
      return Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        // eslint-disable-next-line no-param-reassign
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show)) schema[key] = value;
        return schema;
      }, {});
    },
    filteredSchema() {
      const { categories, ...schema } = this.computedSchema;
      return schema;
    },
    categoriesList() {
      const { categories } = this.computedSchema;
      return categories;
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
      const categoryNames = this.categories.length > 0 ? this.categories.map(category => category.display_name) : ['Category'];

      return {
        name: this.data.name || 'Name',
        available_languages: [this.data.language || 'language'],
        language: this.data.language || 'language',
        owner__nickname: this.myProfile.name,
        categories: this.categories.map(category => ({ name: category.display_name, ...category })),
        categories_list: categoryNames,
        slug: 'name',
      };
    },
    async onSubmit() {
      const categoryValues = this.categories.map(category => category.value);
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

    .create-repository {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        margin: 4rem 8rem;

        &__title {
          color: $color-primary;
          font-size: 3rem;
        }

        &__form {
            text-align: left;
            margin: 1.5rem 0;
            &__wrapper {
                width: 31rem;
                margin: 0 1rem 3rem 0;
            }
        }

        &__card {
            width: 23.3rem;
            height: 23.3rem;

            &__wrapper {
              height: 100%;
              display: flex;
              align-items: center;
            }
        }
    }
</style>
