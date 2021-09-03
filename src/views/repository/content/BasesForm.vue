<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <section class="repository-base-edit">
      <section>
        <div class="repository-base-edit__header">
           <span
            @click="routerHandle('repository-content-bases')"
          >
            <unnnic-icon
              icon="keyboard-arrow-left-1" size="md"
            />
          </span>
          <h1 class="repository-base-edit__title">{{ knowledgeBase.title }}</h1>
          <unnnicButton
            size="large"
            text=""
            type="terciary"
            iconRight="pencil-write-1"
            :disabled="false"
            :loading="false"
          />
        </div>
        <p class="repository-base-edit__text">Salvo por último hoje às 16h00</p>
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
            <unnnicSelect
              size="md"
              type="normal"
              placeholder=""
            >
              <div slot="header">{{}}</div>
              <option>None</option>
              <option>option1</option>
              <option>option2</option>
              <option>option3</option>
              <option>option4</option>
              <option>option5</option>
            </unnnicSelect>
          </div>
      </section>   <!-- buttons and select -->
    </section>
    <section>
      {{ knowledgeBase.texts }}
        <textarea v-if="knowledgeBase.texts[selectedLanguage]"
          v-model="knowledgeBase.texts[selectedLanguage].value" name=""
          id="" cols="30" rows="10"
          class="repository-base-edit__textarea"
        >
        </textarea>
    </section>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';
import { mapActions } from 'vuex';

export default {
  name: 'RepositoryBaseEdit',
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  data() {
    return {
      repositoryUUID: null,
      bases: [],
      submitting: false,
      selectedLanguage: '',
      knowledgeBase: {
        title: '',
        texts: {},
      },
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions(['createQAKnowledgeBase', 'getQAKnowledgeBase', 'getQATexts', 'createQAText', 'updateQAText']),

    routerHandle(path) {
      if (path !== this.$router.currentRoute.name) {
        this.$router.push({
          name: `${path}`
        });
      }
    },
    async saveText(){
      console.log('test', this.$route.name, this.$route.name === 'repository-content-bases-new');
      if (this.$route.name === 'repository-content-bases-new') {
        const response = await this.createQAKnowledgeBase({
          repositoryUUID: this.repositoryUUID,
          title: this.knowledgeBase.title,
        });

        this.$router.push({
          name: 'repository-content-bases-edit',
          params: {
            id: response.data.id,
          },
        });
      }

      const data = {
        id: this.knowledgeBase.texts[this.selectedLanguage].id,
        repositoryUUID: this.repositoryUUID,
        knowledgeBaseId: this.$route.params.id,
        text: this.knowledgeBase.texts[this.selectedLanguage].value,
        language: this.selectedLanguage,
      };

      if (data.id) {
        const responseUpdateText = await this.updateQAText(data);
      } else {
        const responseCreateText = await this.createQAText(data);
        this.knowledgeBase.texts[this.selectedLanguage].id = responseCreateText.data.id;
      }
    },
  },
  watch: {
    // eslint-disable-next-line
    'repository.uuid': {
      handler() {
        if (!this.repository.uuid || this.repository.uuid === 'null') {
          return false;
        }

        this.repositoryUUID = this.repository.uuid;

        return true;
      },

      immediate: true,
    },
    async repositoryUUID() {
      if (this.$route.name === 'repository-content-bases-edit') {
        const response = await this.getQAKnowledgeBase({
          repositoryUUID: this.repositoryUUID,
          id: this.$route.params.id
        });

        const { title } = response.data;

        this.knowledgeBase.title = title;
        const responseText = await this.getQATexts({
          repositoryUUID: this.repositoryUUID,
          knowledgeBaseId: this.$route.params.id,
          page: 0,
        });

        responseText.data.results.forEach(({ id, language, text }) => {
          this.$set(this.knowledgeBase.texts, language, {
            id,
            value: text,
          });
        });
      } else {
        this.knowledgeBase.title = this.$t('webapp.home.no_description');
      }

      this.selectedLanguage = this.repository.language;
    },

    selectedLanguage() {
      if (!this.knowledgeBase.texts[this.selectedLanguage]) {
        this.$set(this.knowledgeBase.texts, this.selectedLanguage, {
          id: null,
          value: '',
        });
      }
    },
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

    span{
      cursor: pointer;
      margin-right: 1rem;
    }
  }
    &__title{
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
