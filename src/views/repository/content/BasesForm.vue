<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <section class="repository-base-edit">
      <section class="repository-base-edit__header">
        <span
            @click="routerHandle('repository-content-bases')"
          >
            <unnnic-icon
              icon="keyboard-arrow-left-1"
            />
          </span>
        <div>
          <div class="repository-base-edit__header--content">
            <h1
              ref="focusInput"
              class="repository-base-edit__title"
              contenteditable="true"
              @input="onTitleChange"
            >{{ provisoryTitle }}</h1>
            <unnnicButton
              text=""
              type="terciary"
              iconRight="pencil-write-1"
              :disabled="false"
              :loading="false"
              @click.native="editTitle()"
              class="repository-base-edit__header__button"
            />
          </div>
          <p class="repository-base-edit__text">Salvo por último hoje às 16h00 - estático ainda</p>
        </div>
      </section>
      <section class="repository-base-edit__header">
          <unnnicButton
            size="large"
            text="Excluir base"
            type="terciary"
            iconLeft="bin-1-1"
            :iconRight="null"
            :disabled="false"
            :loading="false"
            @click="openDeleteModal()"
          />
          <unnnicButton
            size="large"
            text="Salvar"
            type="terciary"
            iconLeft="floppy-disk-1"
            :iconRight="null"
            :disabled="false"
            :loading="submitting"
            @click="saveText()"
          />
          <unnnicButton
            size="large"
            text="Testar base"
            type="terciary"
            iconLeft="messages-bubble-4"
            :iconRight="null"
            :disabled="false"
            :loading="false"
          />
          <div>
            <unnnic-input
              disabled
              :value="languages[selectedLanguage]"
              icon-right="arrow-button-down-1"
            />
          </div>
      </section>   <!-- buttons and select -->
    </section>
    <section>
        <textarea v-if="knowledgeBase.texts[selectedLanguage]"
          v-model="knowledgeBase.texts[selectedLanguage].value" name=""
          id="" cols="30" rows="10"
          class="repository-base-edit__textarea"
        >
        </textarea>
    </section>

    <modal
      v-if="isDeleteModalOpen"
      type="confirm"
      :data="modalData"
      @close="isDeleteModalOpen = false"
    />
    <unnnic-modal
      :show-modal="openModal"
      scheme='feedback-yellow'
      modal-icon='alert-circle-1'
      :text="$t('webapp.home.bases.adjustuments_modal_alert_title')"
      :description="$t('webapp.home.bases.adjustments_modal_alert_description')"
      @close="openModal = false"
    >
      <unnnic-button
        slot="options"
        class="create-repository__container__button"
        type="terciary"
        @click="discardUpdate()"
      >
      {{ $t("webapp.home.bases.adjustments_modal_alert_discard") }}
      </unnnic-button>
      <unnnic-button
        slot="options"
        class="create-repository__container__button"
        type="primary"
        scheme="feedback-yellow"
        @click="saveClose()"
        :loading="submitting"
      >
        {{ $t("webapp.home.bases.adjustments_modal_alert_save") }}
      </unnnic-button>
    </unnnic-modal>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import Modal from '@/components/repository/CreateRepository/Modal'
import RepositoryBase from '../Base';
import { mapActions } from 'vuex';
import { LANGUAGES } from '@/utils/index';
import router from '@/router/index'

export default {
  name: 'RepositoryBaseEdit',
  components: {
    RepositoryViewBase,
    Modal,
  },
  extends: RepositoryBase,
  data() {
    return {
      repositoryUUID: null,
      isDeleteModalOpen: false,
      isSavedModalOpen: false,
      openModal: false,
      localNext: null,
      bases: [],
      submitting: false,
      selectedLanguage: '',
      knowledgeBase: {
        title: '',
        oldTitle: '',
        texts: {},
      },
      modalData: {},
      destroyVerifying: null,
      provisoryTitle: '',
      languages: LANGUAGES,
    };
  },
  methods: {
    ...mapActions([
      'createQAKnowledgeBase',
      'getQAKnowledgeBase',
      'getQATexts',
      'createQAText',
      'updateQAText',
      'deleteQAKnowledgeBase',
      'editQAKnowledgeBase'
    ]),
    onTitleChange(event) {
      this.knowledgeBase.title = event.srcElement.textContent;
    },
    routerHandle(path) {
      if (path !== this.$router.currentRoute.name) {
        this.$router.push({
          name: `${path}`
        });
      }
    },
    openDeleteModal(){
      this.isDeleteModalOpen = true;

      this.modalData = {
        icon: 'alert-circle-1',
        scheme: 'feedback-red',
        persistent: true,
        title: `${this.$t('webapp.home.bases.edit-base_modal_delete_title')} "${this.knowledgeBase.title}"?`,
        description: this.$t('webapp.home.bases.edit-base_modal_delete_text'),
        validate: {
          label: ` 
            Type <b>${this.knowledgeBase.title}</b> to confirm the deletion
          `,
          placeholder: this.$t('webapp.home.bases.edit-base_modal_delete_placeholder'),
          text: this.knowledgeBase.title,
        },
        cancelText: this.$t('webapp.home.bases.edit-base_modal_delete_button_cancel'),
        confirmText: this.$t('webapp.home.bases.edit-base_modal_delete_button_confirm'),
        onConfirm: async (justClose, { setLoading }) => {
          setLoading(true);
          await this.deleteBase();
          setLoading(false);
          justClose();

          this.routerHandle('repository-content-bases');
        }
      };
    },
    async saveText(){
      if (this.$route.name === 'repository-content-bases-new') {
        const response = await this.createQAKnowledgeBase({
          repositoryUUID: this.repositoryUUID,
          title: this.knowledgeBase.title,
        });

        this.knowledgeBase.oldTitle = response.data.title;

        this.destroyVerifying();

        this.$router.push({
          name: 'repository-content-bases-edit',
          params: {
            id: response.data.id,
          },
        });

        this.init();
      }

      console.log('chegou antes save text');

      const data = {
        id: this.knowledgeBase.texts[this.selectedLanguage].id,
        repositoryUUID: this.repositoryUUID,
        knowledgeBaseId: this.$route.params.id,
        text: this.knowledgeBase.texts[this.selectedLanguage].value,
        language: this.selectedLanguage,
      };
      console.log(data);

      this.submitting = true;

      if (data.id) {
        if (data.text) {
          const responseUpdateText = await this.updateQAText(data);
          this.knowledgeBase.texts[this.selectedLanguage].oldValue = responseUpdateText.data.text;
        }

        const responseEditKnowledgeBase = await this.editQAKnowledgeBase({
          repositoryUUID: this.repositoryUUID,
          id: this.$route.params.id,
          title: this.knowledgeBase.title,
        });

        this.knowledgeBase.oldTitle = responseEditKnowledgeBase.data.title;
      } else if (data.text) {
        const responseCreateText = await this.createQAText(data);
        this.knowledgeBase.texts[this.selectedLanguage].id = responseCreateText.data.id;
        this.knowledgeBase.texts[this.selectedLanguage].oldValue = responseCreateText.data.text;
      }

      this.submitting = false;
    },
    async deleteBase(){
      const responseDeleteBase = await this.deleteQAKnowledgeBase({
        repositoryUUID: this.repositoryUUID,
        id: this.$route.params.id
      });

      this.destroyVerifying();
    },
    discardUpdate() {
      this.openModal = false;

      if (this.localNext) {
        this.localNext();
      }
    },
    async saveClose() {
      await this.saveText()
      this.openModal = false

      if (this.localNext) {
        this.localNext();
      }
    },
    editTitle() {
      this.$refs.focusInput.focus()
    },
    async init() {
      const response = await this.getQAKnowledgeBase({
        repositoryUUID: this.repositoryUUID,
        id: this.$route.params.id
      });

      const { title } = response.data;

      this.knowledgeBase.title = title;
      this.provisoryTitle = title;
      const responseText = await this.getQATexts({
        repositoryUUID: this.repositoryUUID,
        knowledgeBaseId: this.$route.params.id,
        page: 0,
      });

      responseText.data.results.forEach(({ id, language, text }) => {
        this.$set(this.knowledgeBase.texts, language, {
          id,
          value: text,
          oldValue: text,
        });
      });
    },
  },
  watch: {
    // eslint-disable-next-line
    'repository': {
      handler() {
        if (!this.repository?.language || !this.repository?.uuid || this.repository?.uuid === 'null') {
          return false;
        }

        this.repositoryUUID = this.repository.uuid;
        this.selectedLanguage = this.repository.language;

        return true;
      },

      deep: true,
      immediate: true,
    },
    async repositoryUUID() {
      if (this.$route.name === 'repository-content-bases-edit') {
        this.init();
      } else {
        this.provisoryTitle = this.$t('webapp.home.bases.edit-base-notitle');
        this.knowledgeBase.title = this.provisoryTitle;
      }
    },

    selectedLanguage() {
      if (!this.knowledgeBase.texts[this.selectedLanguage]) {
        this.$set(this.knowledgeBase.texts, this.selectedLanguage, {
          id: null,
          value: '',
          oldValue: '',
        });
      }
    },
  },
  computed: {
    hasUpdates() {
      // if (this.$route.name === 'repository-content-bases-new') {
      //   return false;
      // }

      if (this.knowledgeBase.title !== this.knowledgeBase.oldTitle) {
        return true;
      }

      return Object.keys(this.knowledgeBase.texts)
        .some(
          (language) => this.knowledgeBase.texts[language].value
          !== this.knowledgeBase.texts[language].oldValue
        );
    },
  },
  mounted() {
    this.destroyVerifying = router.beforeEach((to, from, next) => {
      if (this.hasUpdates) {
        this.openModal = true;
        this.localNext = next;
      } else {
        next();
      }
    });
  },

  destroyed() {
    this.destroyVerifying();
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";


.repository-base-edit{
   display: flex;
    align-items: center;
    justify-content: space-between;
  &__header{
    display: flex;
    align-items: center;
    &--content{
      display: flex;
      align-items: center;
    }
    span{
      cursor: pointer;
      margin-right: 1rem;
    }
    &__button{
      &:hover{
        border: none;
      }
    }
  }
    &__title{
        border: none;
        font-family: $unnnic-font-family-primary;
        font-size: $unnnic-font-size-title-sm;
      }

    &__text{
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      color: $unnnic-color-neutral-cloudy;
    }

    &__textarea{
      width: 100%;
      resize: none;
      height: 100vh;
      border: 1px solid $unnnic-color-neutral-soft;
      border-radius: 8px;
      margin-top: 34px;
      padding: 40px 64px;
      font-family: $unnnic-font-family-primary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: 29px;
      text-align: justify;
      color: $unnnic-color-neutral-dark;

      &::-webkit-scrollbar {
        margin-right: 1rem;
      }
    }
}
</style>
