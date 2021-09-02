<template>
  <div class="create-repository">
    <div class="create-repository__container">
      <div class="create-repository__container__indicator">
        <unnnic-indicator
          :numberOfSteps="2"
          :currentStep="current + 1"
          :titles="[
            `${$t('webapp.create_repository.first_indicator')}`,
            `${$t('webapp.create_repository.second_indicator')}`
          ]"
        />
      </div>
      <section v-show="current === 0" class="create-repository__container__steps">
        <intelligence-tab
          @nextStep="changeStepContent($event, 1)"
          @backModal="onChangeModalState(true)"
        />
      </section>
      <section v-show="current === 1" class="create-repository__container__steps">
        <definitions-tab
          @previousStep="changeStepContent($event, 0)"
          @createRepository="createRepository($event)"
        />
      </section>
      <section v-show="current == 2" class="create-repository__container__steps">
        <div class="create-repository__container__steps__wrapper">
          <div class="create-repository__container__steps__wrapper__title">
            <h1>
              {{ $t("webapp.create_repository.repository_created_first") }} <br />
              {{ $t("webapp.create_repository.repository_created_second") }}
              <emoji name="Winking Face" />
            </h1>
          </div>

          <div class="create-repository__container__steps__wrapper__button">
            <router-link :to="repositoryDetailsRouterParams()">
              <unnnic-button
                type="secondary"
                @click.native="sendEvent()"
                class="create-repository__container__steps__wrapper__button__btn"
              >
                {{ $t("webapp.create_repository.navigate_to_intelligence_button") }}
              </unnnic-button>
            </router-link>
          </div>
        </div>
      </section>
      <unnnic-modal
        :showModal="openModal"
        :text="$t('webapp.create_repository.modal_title')"
        scheme="feedback-yellow"
        modal-icon="alert-circle-1"
        @close="onChangeModalState(false)"
      >
        <span slot="message" v-html="$t('webapp.create_repository.modal_description')" />
        <unnnic-button slot="options" type="terciary" @click="navigateToHomepage()">
          {{ $t("webapp.create_repository.modal_exit_button") }}
        </unnnic-button>
        <unnnic-button
          slot="options"
          class="create-repository__container__button"
          type="primary"
          @click="onChangeModalState(false)"
        >
          {{ $t("webapp.create_repository.modal_continue_button") }}
        </unnnic-button>
      </unnnic-modal>
    </div>
  </div>
</template>

<script>
import { getModel } from 'vue-mc-drf-model';
import { mapActions, mapGetters } from 'vuex';
import { updateAttrsValues } from '@/utils/index';
import RepositoryModel from '@/models/newRepository';
import Analytics from '@/utils/plugins/analytics';
import IntelligenceTab from '@/components/repository/CreateRepository/IntelligenceTab';
import DefinitionsTab from '@/components/repository/CreateRepository/DefinitionsTab';
import Emoji from '@/components/shared/Emoji';

export default {
  name: 'CreateRepositoryForm',
  components: {
    IntelligenceTab,
    DefinitionsTab,
    Emoji
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
      openModal: false,
      createdRepository: {},
    };
  },
  computed: {
    ...mapGetters(['getOrgSelected']),
    computedSchema() {
      const computed = Object.entries(this.formSchema).reduce((schema, entry) => {
        const [key, value] = entry;
        if (!(value.style && typeof value.style.show === 'boolean' && !value.style.show) || key === 'repository_type') {
          schema[key] = value;
        }
        return schema;
      }, {});
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
    }
  },
  async mounted() {
    this.formSchema = await this.getNewRepositorySchema();
    this.constructModels();
  },
  methods: {
    ...mapActions(['getNewRepositorySchema', 'newRepository']),
    changeStepContent(value, current) {
      this.data = { ...this.data, ...value };
      this.current = current;
    },
    sendEvent() {
      Analytics.send({ category: 'Intelligence', event: 'create intelligence event' });
    },
    constructModels() {
      const Model = getModel(this.computedSchema, RepositoryModel);
      this.drfRepositoryModel = new Model({}, null, {
        validateOnChange: true
      });
    },
    repositoryDetailsRouterParams() {
      const { repository_type, owner__nickname, slug } = this.createdRepository;
      let name;

      if (repository_type === 'content') {
        name = 'repository-content-bases';
      } else if (repository_type === 'classifier') {
        name = 'repository-summary';
      }

      return {
        name,
        params: {
          ownerNickname: owner__nickname,
          slug
        }
      };
    },
    createRepository(value) {
      this.changeStepContent(value, 2);
      this.onSubmit();
    },
    onChangeModalState(value) {
      this.openModal = value;
    },
    navigateToHomepage() {
      this.openModal = false;
      this.$router.push({
        name: 'home'
      });
    },
    onSubmit() {
      this.submit(this.drfRepositoryModel);
    },
    async submit(model) {
      const { organization, categories, isPrivate, ...data } = this.data;
      const updatedModel = updateAttrsValues(model, {
        ...data,
        is_private: isPrivate,
        organization: this.getOrgSelected,
        categories
      });
      this.submitting = true;
      this.errors = {};

      try {
        const response = await updatedModel.save();
        const { owner__nickname, slug } = response.response.data;
        this.createdRepository = response.response.data;
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
    margin-top: 6.25rem;

    &__indicator {
      width: 18%;
      margin-bottom: 3.2rem;
    }

    &__steps {
      width: 100%;

      &__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &__title {
          text-align: center;
          color: $unnnic-color-neutral-darkest;
          font-family: $unnnic-font-family-primary;
          font-size: $unnnic-font-size-title-md;
        }

        &__button {
          width: 70%;
          margin-top: 2rem;

          &__btn {
            width: 100%;
          }
        }
      }
    }

    &__button {
      background-color: $unnnic-color-feedback-yellow;
    }
  }
}
</style>
