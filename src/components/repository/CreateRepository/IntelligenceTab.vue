<template>
  <div class="create-repository__intelligence">
    <h1 class="create-repository__intelligence__title">
      {{ $t("webapp.create_repository.intelligence") }}
    </h1>
    <div class="create-repository__intelligence__wrapper">
      <unnnic-input
        :label="$t('webapp.create_repository.intelligence_name_label')"
        :placeholder="$t('webapp.create_repository.intelligence_name_placeholder')"
        v-model="intelligence.name"
      />
      <unnnic-input
        :label="$t('webapp.create_repository.description_label')"
        :placeholder="$t('webapp.create_repository.description_placeholder')"
        v-model="intelligence.description"
      />
      <div class="create-repository__intelligence__type">
        <unnnic-card
          clickable
          :title="$t('webapp.create_repository.intelligence_type_classification_title')"
          :description="$t('webapp.create_repository.intelligence_type_classification_description')"
          type="content"
          icon="typing-1"
          class="create-repository__intelligence__type__content"
          :enabled="intelligence.repository_type === 'classifier'"
          @click.native="intelligence.repository_type = 'classifier'"
        />
        <unnnic-card
          clickable
          :title="$t('webapp.create_repository.intelligence_type_content_title')"
          :description="$t('webapp.create_repository.intelligence_type_content_description')"
          type="content"
          icon="paginate-filter-text-1"
          class="create-repository__intelligence__type__content"
          :enabled="intelligence.repository_type === 'content'"
          @click.native="intelligence.repository_type = 'content'"
        />
      </div>
      <div class="create-repository__intelligence__buttons">
        <unnnic-button
          type="terciary"
          class="create-repository__intelligence__buttons__btn"
          @click.native="dispatchBackModal()"
        >
          {{ $t("webapp.create_repository.cancel_create_intelligence_button") }}
        </unnnic-button>

        <unnnic-button
          type="secondary"
          class="create-repository__intelligence__buttons__btn"
          :disabled="!checkHasValue"
          @click.native="dispatchNextStep()"
        >
          {{ $t("webapp.create_repository.navigate_to_next_button") }}
        </unnnic-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntelligenceTab',
  data() {
    return {
      intelligence: {
        name: '',
        description: '',
        repository_type: ''
      }
    };
  },
  computed: {
    checkHasValue() {
      return this.intelligence.name !== '' && this.intelligence.description !== '';
    }
  },
  methods: {
    dispatchBackModal() {
      this.$emit('backModal');
    },
    dispatchNextStep() {
      this.$emit('nextStep', this.intelligence);
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
  &__intelligence {
    width: 100%;
    height: 30.625rem;

    &__title {
      text-align: center;
      color: $unnnic-color-neutral-darkest;
      font-family: $unnnic-font-family-primary;
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    &__wrapper * {
      margin-bottom: 2rem;
    }

    &__type {
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
.no-show{
  display: none;
}
</style>
