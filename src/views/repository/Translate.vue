<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">

        <div
          v-if="repository.authorization.can_contribute || repository.authorization.can_translate">

          <div class="repository-translate">
            <div class="repository-translate__translateButtons">

              <b-button
                :class="{'is-primary':!!translate.from && !!translate.to}"
                class="repository-translate__buttons repository-translate__unableButton"
                @click="checkLanguageToImport()">Import</b-button>

              <b-button
                :class="{'is-primary':!!translate.from && !!translate.to}"
                class="repository-translate__buttons repository-translate__unableButton"
                @click="checkLanguageToExport()">Export</b-button>

            </div>
            <div class="repository-translate__field">
              <div class="repository-translate__field__item">
                <b-field :label="$t('webapp.translate.translate_from')">
                  <language-select v-model="translate.from" />
                </b-field>
              </div>
              <div class="repository-translate__translate-arrow-icon">
                <div class="field">
                  <label class="label">&nbsp;</label>
                  <b-icon
                    icon="chevron-right"
                    size="is-small" />
                </div>
              </div>
              <div class="repository-translate__field__item">
                <b-field :label="$t('webapp.translate.translate_to')">
                  <language-select
                    v-model="translate.to"
                    :exclude="[translate.from]" />
                </b-field>
              </div>
            </div>
          </div>
          <div
            v-if="!!translate.from && !!translate.to">

            <b-modal
              :active.sync="isImportFileVisible"
              class="repository-translate__fileModal">
              <div class="repository-translate__fileModal__file">

                <b-field
                  label="Select a file to import"
                  class="custom-file-upload">
                  <div class="custom-file-upload__input">
                    <b-upload v-model="translationFile">
                      <a class="button is-primary">
                        <b-icon icon="upload"/>
                        <span>Click to upload</span>
                      </a>
                    </b-upload>
                    <span
                      v-if="translationFile"
                      class="file-name">
                      {{ translationFile.name }}
                    </span>
                  </div>
                  <p>Choose the file containing the sentences you want
                  import it translations. Use the following <a>format</a></p>

                  <div class="repository-translate__styleButton">
                    <b-button
                      :loading="waitDownloadFile"
                      :disabled="translationFile === null"
                      class="repository-translate__buttons"
                      type="is-primary"
                      @click="importTranslation()">Import</b-button>
                  </div>
                </b-field>

              </div>
            </b-modal>

            <b-modal
              :active.sync="isExportFileVisible"
              class="repository-translate__switchModal">
              <div class="repository-translate__switchModal__switch">
                <b-field
                  label="Export only not translated sentences"/>
                <b-switch v-model="isSwitched">
                  {{ checkSwitch }}
                </b-switch>
                <p>When enabling this option, the export file will contain
                just not translated sentences</p>
                <div class="repository-translate__styleButton">
                  <b-button
                    :loading="waitDownloadFile"
                    type="is-primary"
                    class="repository-translate__buttons"
                    @click="exportTranslation()">Export</b-button>
                </div>
              </div>

            </b-modal>
            <hr>
            <div class="repository-translate__search">
              <filter-examples
                :intents="repository.intents_list"
                :entities="repository.entities_list"
                @queryStringFormated="onSearch($event)"/>
            </div>
            <translate-list
              :update="update"
              :repository="repository"
              :query="query"
              :from="translate.from"
              :to="translate.to"
              @translated="examplesTranslated()" />
          </div>
        </div>
        <authorization-request-notification
          v-else
          :repository-uuid="repository.uuid"
          @onAuthorizationRequested="updateRepository(false)" />
      </div>
      <div v-else>
        <b-notification
          :closable="false"
          class="is-info"
          role="alert">
          {{ $t('webapp.translate.login') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import LanguageSelect from '@/components/inputs/LanguageSelect';
import TranslateList from '@/components/translate/TranslateList';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import { exampleSearchToDicty, exampleSearchToString } from '@/utils/index';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';

export default {
  name: 'RepositoryTranslate',
  components: {
    FilterExamples,
    RepositoryViewBase,
    LanguageSelect,
    TranslateList,
    TranslationsList,
    LoginForm,
    AuthorizationRequestNotification,
  },
  extends: RepositoryBase,
  data() {
    return {
      trainResponse: null,
      translationFile: null,
      isSwitched: false,
      isExportFileVisible: false,
      isImportFileVisible: false,
      waitDownloadFile: false,
      translate: {
        from: null,
        to: null,
        update: false,
      },
      toLanguage: null,
      query: {},
      querySchema: {},
      errors: '',
    };
  },
  computed: {
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    checkSwitch() {
      if (this.isSwitched === true) {
        return 'Yes';
      }
      return 'No';
    },
  },
  methods: {
    ...mapActions([
      'getRepository',
      'exportTranslations',
      'importTranslations',
    ]),
    async exportTranslation() {
      this.waitDownloadFile = !this.waitDownloadFile;
      try {
        const xlsFile = await this.exportTranslations({
          repositoryUuid: this.selectedRepository.uuid,
          versionUUID: this.selectedRepository.repository_version_id,
          fromLanguage: this.translate.from,
          toLanguagem: this.translate.to,
          statusTranslation: this.isSwitched,
        });
        this.forceFileDownload(xlsFile);
        this.$buefy.toast.open({
          message: 'Downloading File',
          type: 'success',
        });
      } catch (error) {
        this.errors = error;
      }
      this.waitDownloadFile = !this.waitDownloadFile;
      return false;
    },

    async importTranslation() {
      this.waitDownloadFile = !this.waitDownloadFile;
      const formData = new FormData();
      formData.append('file', this.translationFile);
      formData.append('language', this.translate.to);

      try {
        const importDownload = await this.importTranslations({
          repositoryUuid: this.selectedRepository.uuid,
          versionUUID: this.selectedRepository.repository_version_id,
          formData,
        });
        this.forceFileDownload(importDownload);
      } catch (error) {
        this.errors = error;
      }
      this.waitDownloadFile = !this.waitDownloadFile;
      this.translationFile = null;
      this.$refs.inputFile.value = '';
      return false;
    },
    forceFileDownload(response) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const result = document.createElement('a');
      result.href = window.URL.createObjectURL(blob);
      result.download = 'bothub.xlsx';
      result.click();
    },
    checkLanguageToImport() {
      if (this.translate.from && this.translate.to) {
        this.isImportFileVisible = true;
      }
    },
    checkLanguageToExport() {
      if (this.translate.from && this.translate.to) {
        this.isExportFileVisible = true;
      }
    },
    clearIconClick() {
      this.translationFile = null;
    },
    examplesTranslated() {
      this.update = !this.update;
    },
    onSearch(value) {
      Object.assign(this.querySchema, value);

      if (!this.querySchema.intent) {
        delete this.querySchema.intent;
      }
      if (!this.querySchema.entity) {
        delete this.querySchema.entity;
      }
      if (!this.querySchema.label) {
        delete this.querySchema.label;
      }
      const formattedQueryString = exampleSearchToString(this.querySchema);
      this.query = exampleSearchToDicty(formattedQueryString);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.repository-translate {
  background-color: $color-white;
  display:flex;
   flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &__field {
    display: flex;
    padding: 0.25rem;
    width: 100%;
    &__item {
      margin: 0.5rem;
         width: 50%
    }
  }

  &__translate-arrow-icon {
    align-self: center;
  }

  &__search {
    margin: 0.5rem;
  }
  &__requestAuthorization{
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        text-align: center;
        float: right
  }

&__fileModal{
   display: flex;
    justify-content: center;
    align-items: center;
 &__file{
    background-color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 13rem;

    p{
      font-size: $font-small;
    }
  }
}

&__switchModal{
   display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__switch{
      background-color: $color-white;
      justify-content: center;
      align-items: center;
      height: 11rem;
      padding: 1rem;
        p{
        font-size: $font-small;
        }
    }
}
  &__styleButton{
    width:100%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__buttons{
    min-width: 18%;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__translateButtons{
    display: flex;
    width: 100%;
    justify-content: flex-end
  }
  &__unableButton{
    background-color:$color-grey;
    color: $color-white;
    border: 2px solid #D5D5D5;
    font-weight: $font-weight-medium;
    box-shadow: 0 0.1875rem 0.375rem rgba(200, 200, 200, 0.5);

     &:hover{
      color: $color-white;
      border: 2px solid #D5D5D5;
      cursor:default
    }
    &:focus{
      color: $color-white;
      border: 2px solid #D5D5D5;
      cursor:default
    }
  }
}

.custom-file-upload {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem;

  &__input{
   display: flex;
  }

}

</style>
