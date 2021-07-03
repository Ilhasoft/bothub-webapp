<template>
  <unnnic-modal
    :showModal="openModal"
    :text="
      $t(
        hasIntegration
          ? 'webapp.home.remove_integrate_modal_title'
          : 'webapp.home.integrate_modal_title',
        {
          intelligence: repository.name,
        }
      )
    "
    :scheme="hasIntegration ? 'feedback-red' : 'feedback-yellow'"
    modal-icon="alert-circle-1"
    @close="dispatchCloseModal()"
  >
    <div slot="message" class="integration-modal__container">
      <span
        v-html="
          hasIntegration
            ? $t('webapp.home.remove_integrate_modal_subtitle')
            : $t('webapp.home.integrate_modal_subtitle')
        "
      />
      <div class="integration-modal__field" v-show="hasIntegration">
        <span
          class="integration-modal__field__label"
          v-html="$t('webapp.home.confirm_with_username', { username: myProfile.name })"
        />
        <unnnic-input
          v-model="username"
          class="integration-modal__field__input"
          :placeholder="$t('webapp.home.confirm_with_username_placeholder')"
        />
      </div>
    </div>

    <unnnic-button slot="options" type="terciary" @click="dispatchCloseModal()">
      {{ $t("webapp.home.cancel") }}
    </unnnic-button>
    <unnnic-button
      slot="options"
      class="integration-modal__button"
      :class="{ 'integration-modal__button__opacity': checkInputConfirm && hasIntegration }"
      type="terciary"
      :disabled="hasIntegration && checkInputConfirm"
      @click="hasIntegration ? dispatchRemoveIntegrateRepository() : dispatchIntegrateRepository()"
    >
      <span v-if="hasIntegration" class="integration-modal__button__txt">{{
        $t("webapp.home.confirm_remove_integrate")
      }}</span>
      <span v-else>{{ $t("webapp.home.confirm_integrate") }}</span>
    </unnnic-button>
  </unnnic-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'IntegrationModal',
  props: {
    openModal: {
      type: Boolean,
      default: false
    },
    repository: {
      type: Object,
      default: () => {}
    },
    hasIntegration: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: ''
    };
  },
  computed: {
    ...mapGetters(['getProjectSelected', 'getOrgSelected', 'myProfile']),
    checkInputConfirm() {
      return this.username === '' || this.username !== this.myProfile.name;
    }
  },
  methods: {
    ...mapActions([
      'setIntegrationRepository',
      'removeIntegrationRepository',
      'setUpdateRepository'
    ]),
    dispatchCloseModal() {
      this.$emit('closeIntegratationModal');
    },
    async dispatchRemoveIntegrateRepository() {
      await this.removeIntegrationRepository({
        repository_version: this.repository.repository_version_id,
        repository_uuid: this.repository.uuid,
        project_uuid: this.getProjectSelected,
        organization: this.getOrgSelected
      });
      this.$emit('closeIntegratationModal');
      this.setUpdateRepository(true);
    },
    async dispatchIntegrateRepository() {
      await this.setIntegrationRepository({
        repository_version: this.repository.repository_version_id,
        repository_uuid: this.repository.uuid,
        name: this.repository.name,
        project_uuid: this.getProjectSelected,
        organization: this.getOrgSelected
      });
      this.$emit('closeIntegratationModal');
      this.setUpdateRepository(true);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.integration-modal {
  &__container {
    margin-top: 1.5rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;

    &__label {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-cloudy;
      margin: $unnnic-spacing-stack-xs 0;
    }

    &__input {
      width: 100%;
    }
  }

  &__button {
    &__opacity {
      opacity: 0.4;
    }
    &__txt {
      color: $unnnic-color-feedback-red;
    }
  }
}
</style>
