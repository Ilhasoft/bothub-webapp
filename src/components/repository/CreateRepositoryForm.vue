<template>
  <div class="create-repository">
    <form class="create-repository__container" @submit.prevent="onSubmit()">
      <div class="create-repository__container__indicator">
        <unnnic-indicator
          :numberOfSteps="2"
          :currentStep="current + 1"
          :titles="['Inteligência', 'Definições']"
        />
      </div>
      <section v-show="current == 0" class="create-repository__container__steps">
        <h1 class="create-repository__container__steps__title">
          {{ $t("webapp.create_repository.create_repo") }}
        </h1>
        <div class="create-repository__container__steps__wrapper">
          <unnnic-input
            v-model="data.name"
            label="Nome da Inteligência"
            placeholder="Defina o nome para a Inteligência"
          />
          <unnnic-input
            v-model="data.description"
            label="Descrição"
            placeholder="Descreva brevemente o propósito desta inteligência"
          />
          <div class="create-repository__container__steps__intelligence-type">
            <unnnic-card
              clickable
              title="Inteligência de Classificação (padrão)"
              description="Treine frases de exemplo, atribuindo intenções e a inteligência
              conseguirá identificar essas intenções em novas frases enviadas."
              type="content"
              icon="add-1"
              :enabled="false"
              class="create-repository__container__steps__intelligence-type__content"
              @click.native="createNewIntelligence()"
            />

            <unnnic-card
              clickable
              title="Inteligência de Conteúdo (novo)"
              description="Cadastre textos informativos e a inteligência
               será capaz de responder perguntas feitas por usuários com base no texto."
              type="content"
              icon="add-1"
              class="create-repository__container__steps__intelligence-type__content"
              @click.native="createNewIntelligence()"
            />
          </div>
          <div class="create-repository__container__steps__buttons">
            <unnnic-button
              type="terciary"
              class="create-repository__container__steps__buttons__btn"
            >
              Cancelar
            </unnnic-button>

            <unnnic-button
              type="secondary"
              class="create-repository__container__steps__buttons__btn"
            >
              Avançar
            </unnnic-button>
          </div>
        </div>
      </section>
      <section v-show="current == 1" class="create-repository__container__steps">
        <h1 class="create-repository__wrapper__title">
          {{ $t("webapp.create_repository.choose_category") }}
        </h1>
        <p v-html="$t('webapp.create_repository.choose_category_text')" />
        <loading v-if="!formSchema" />
        <div>
          <category-select
            v-if="formSchema"
            v-model="categories"
            class="create-repository__wrapper__form"
          />
          <div class="create-repository__wrapper__buttons">
            <b-button
              type="is-primary"
              class="create-repository__wrapper__form__buttons"
              @click="current = 0"
            >
              {{ $t("webapp.create_repository.previous") }}
            </b-button>
            <span class="create-repository__wrapper__form__finishButton">
              <b-button
                :disabled="categories.length === 0"
                native-type="submit"
                type="is-primary"
                class="create-repository__wrapper__form__buttons"
              >
                {{ $t("webapp.create_repository.submit") }}
              </b-button>
            </span>
          </div>
        </div>
      </section>
      <section v-if="current == 2" class="create-repository__container__steps">
        <div class="create-repository__wrapper__form__final--message__wrapper">
          <h1 class="create-repository__wrapper__title">
            {{ $t("webapp.create_repository.repository_created") }}
          </h1>
          <p v-html="$t('webapp.create_repository.repository_created_text')" />
          <router-link :to="repositoryDetailsRouterParams()">
            <b-button
              class="create-repository__wrapper__form__final--message__button"
              type="is-primary"
              @click="sendEvent()"
            >
              {{ $t("webapp.create_repository.start") }}
            </b-button>
          </router-link>
        </div>
      </section>
    </form>
  </div>
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
import Analytics from '@/utils/plugins/analytics';

export default {
  name: 'CreateRepositoryForm',
  components: {
    Loading,
    FormGenerator,
    RepositoryCard,
    CategorySelect
  },
  props: {
    userName: {
      type: String,
      default: ''
    }
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
      resultParams: {}
    };
  },
  computed: {
    computedSchema() {
      const computed = Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show)) {
          schema[key] = value;
        }
        return schema;
      }, {});
      delete computed.available_languages;
      const { is_private, ...schema } = computed;
      const organization = {
        label: this.$t('webapp.orgs.owner'),
        fetch: this.getOrgs,
        type: 'choice'
      };
      if (is_private) {
        return { ...schema, organization, is_private };
      }
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
      if (
        this.data.name === ''
        || this.data.description === ''
        || this.data.language === null
        || this.data.language === ''
      ) {
        return false;
      }
      return true;
    }
  },
  watch: {
    errors() {
      if (Object.keys(this.errors).length > 0) {
        this.current = 0;
        this.$buefy.toast.open({
          message: this.$t('webapp.create_repository.default_error'),
          type: 'is-danger'
        });
      }
    }
  },
  async mounted() {
    // this.formSchema = await this.getNewRepositorySchema();
    // this.constructModels();
  },
  methods: {
    ...mapActions([
      'getNewRepositorySchema',
      'newRepository',
      'setTutorialInactive',
      'clearTutorial',
      'clearFinalizatioMessage',
      'setFinalModal',
      'getAllOrgs'
    ]),
    sendEvent() {
      Analytics.send({ category: 'Intelligence', event: 'create intelligence event' });
    },
    constructModels() {
      const Model = getModel(this.computedSchema, RepositoryModel);
      this.drfRepositoryModel = new Model({}, null, {
        validateOnChange: true
      });
      const { organization, ...schema } = this.computedSchema;
      const NoOrgModel = getModel(schema, RepositoryModel);
      this.noOrgModel = new NoOrgModel({}, null, {
        validateOnChange: true
      });
    },
    repositoryDetailsRouterParams() {
      return {
        name: 'repository-summary',
        params: {
          ownerNickname: this.resultParams.ownerNickname,
          slug: this.resultParams.slug
        }
      };
    },
    async getOrgs() {
      this.loading = true;
      const list = await this.getAllOrgs();
      await list.getAllItems();
      const options = list.items.map(org => ({
        label: org.name,
        value: org
      }));
      return options;
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
        slug: this.$t('webapp.create_repository.new_repo')
      };
    },
    onSubmit() {
      this.submit(this.data.organization ? this.drfRepositoryModel : this.noOrgModel);
    },
    async submit(model) {
      const categoryValues = this.categories.map(category => category.id);
      const { organization, ...data } = this.data;
      const updatedModel = updateAttrsValues(model, {
        ...data,
        organization: organization ? organization.id : null,
        categories: categoryValues
      });
      this.submitting = true;
      this.errors = {};

      try {
        const response = await updatedModel.save();
        const { owner__nickname, slug } = response.response.data;
        this.current = 2;
        this.resultParams = { ownerNickname: owner__nickname, slug };
        return true;
      } catch (error) {
        this.errors = this.drfRepositoryModel.errors;
        this.submitting = false;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.create-repository {
  padding: 2rem 4rem;
  background-color: $unnnic-color-background-snow;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: $mobile-width * 1.5) {
    flex-direction: column;
    align-items: center;
  }

  &__container {
    width: 68%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &__indicator {
      width: 20%;
      margin-bottom: 3.2rem;
    }

    &__steps {
      width: 100%;

      &__title {
        text-align: center;
        color: $unnnic-color-neutral-darkest;
        font-family: $unnnic-font-family-primary;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      &__wrapper * {
        margin-bottom: 1.5rem;
      }
      &__intelligence-type {
        display: flex;
        justify-content: space-between;

        &__content {
          width: 47%;
        }
      }

      &__buttons {
        display: flex;
        justify-content: space-between;

        &__btn {
          width: 47%;
        }
      }
    }
  }
}
</style>
