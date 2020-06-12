<template>
  <layout>
    <div class="create-repository">
      <div class="create-repository__form__wrapper">
        <h1> Create an intelligence </h1>
        <p> Now you can create intelligence quickly and easily.
        Let's start now? First, give your repository a name. <br>
          Then choose the language in which he will be trained.
          Finally, determine whether it will be open to the public or private. </p>
        <loading v-if="!formSchema" />
        <form-generator
          v-if="formSchema"
          :drf-model-instance="drfRepositoryModel"
          :schema="formSchema"
          v-model="data"
          :errors="errors"
          class="create-repository__form" />
        <category-list
          v-if="formSchema"
          v-model="categories"
          :list="categoriesList"/>
      </div>
      <div class="create-repository__card">
        <repository-card
          v-bind="cardAttributes()"
          single/>
      </div>
  </div></layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import RepositoryCard from '@/components/repository/RepositoryCard';
import FormGenerator from '@/components/form-generator/FormGenerator';
import Loading from '@/components/shared/Loading';
import NewRepositoryForm from '@/components/repository/NewRepositoryForm';
import { mapActions } from 'vuex';
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
    };
  },
  computed: {
    filteredSchema() {
      return Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        // eslint-disable-next-line no-param-reassign
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show)) schema[key] = value;
        return schema;
      }, {});
    },
    categoriesList() {
      return this.filteredSchema.categories.choices;
    },

  },
  async mounted() {
    this.formSchema = await this.getNewRepositorySchema();
    const Model = getModel(
      this.filteredSchema,
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
    cardAttributes() {
      const categoryNames = this.categories.length > 0 ? this.categories.map(category => category.display_name) : ['Category'];
      const categories = this.categories.length > 0
        ? { name: this.categories[0].display_name, ...this.categories[0] }
        : {
          icon: 'botinho',
          id: 0,
          name: 'Category',
        };

      return {
        name: this.data.name || 'Name',
        available_languages: [this.data.language || 'language'],
        language: this.data.language || 'language',
        owner__nickname: 'User',
        categories,
        categories_list: categoryNames,
        slug: 'name',
      };
    },
    async onSubmit() {
      this.drfRepositoryModel = updateAttrsValues(this.drfRepositoryModel, this.data);
      this.submitting = true;
      this.errors = {};

      try {
        const result = await this.drfRepositoryModel.save();
        this.$emit('created', result.response.data);
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
    .create-repository {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        margin: 4rem 8rem;

        &__form {
            text-align: left;
            &__wrapper {
                width: 31rem;
                margin: 0 1rem 3rem 0;
            }
        }

        &__card {
            width: 23.3rem;
            height: 23.3rem;
        }
    }
</style>
