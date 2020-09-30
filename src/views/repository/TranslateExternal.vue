<template>
  <repository-view-base
    :repository="repository"
    :quick-test="false"
    :error-code="errorCode">

    <div v-if="repository">
      <div
        v-if="repository.authorization.can_contribute || repository.authorization.can_translate">
        <div class="translate-description">
          <h1>{{ $t('webapp.translate.title_translate') }}</h1>
          <p>{{ $t('webapp.translate.subtitle_translate') }}</p>
        </div>
        <div
          v-if="!!translate.to">
          <div class="repository-translate__list">
            <div class="repository-translate__list__search">
              <filter-examples
                :intents="repository.intents_list"
                :entities="repository.entities_list"
                @queryStringFormated="onSearch($event)"/>
            </div>
            <translate-list
              :repository-uuid="repository.uuid"
              :query="query"
              :from="repository.language"
              :to="translate.to"
              @isLoadingContent="loadingList = $event"
              @listPhrase="checkPhraseList($event)"/>
          </div>
          <span>
            <b-button type="is-primary"> Save </b-button>
            <b-button type="is-secondary"> Send </b-button>
          </span>
        </div>
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
import { mapActions, mapState, mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslateList from '@/components/translate/TranslateList';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';
import FilterExamples from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';

export default {
  name: 'RepositoryTranslate',
  components: {
    FilterExamples,
    RepositoryViewBase,
    TranslateList,
    TranslationsList,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      translateUpdate: false,
      querySchema: {},
      errors: '',
      errorMessage: '',
      eventClick: false,
      eventClickFinish: false,
      loadingList: true,
      hasPhrases: false,
      allTranslations: false,
      query: {},
    };
  },
  computed: {
    translate() {
      return {
        to: 'pt_br',
        from: 'en',
      };
    },
    ...mapState({
      selectedRepository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters([
      'activeTutorial',
    ]),
  },
  watch: {
    querySchema() {
      this.updateQuery();
    },
  },
  methods: {
    ...mapActions([
      'getRepository',
      'exportTranslations',
      'importTranslations',
    ]),
    async checkPhraseList(list) {
      if (this.activeTutorial === 'translate') {
        const checkList = await list.getAllItems();
        if (checkList.length === 0) {
          this.hasPhrases = false;
          return;
        }
        this.hasPhrases = true;
      }
    },
    onSearch(value) {
      this.querySchema = { ...value };
    },
    updateQuery() {
      this.query = {
        ...this.querySchema.intent ? { intent: this.querySchema.intent } : {},
        ...this.querySchema.entity ? { intent: this.querySchema.entity } : {},
        ...this.querySchema.label ? { intent: this.querySchema.label } : {},
      };
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
    justify-content: space-between;
    padding: 0.25rem;
    width: 100%;
    &__item {
      margin: 0.5rem;
      width: 45%;
        &__label{
        font-weight: $font-weight-normal;
        }
    }
  }

  &__translate-arrow-icon {
    align-self: center;
    color: $color-grey-dark;
  }
  &__list{
    margin-left: 0.3rem;
  &__search {
    margin: 0.5rem;

    &__status {
      margin: 3rem 0 4.4rem 0;
    }
  }
  }

  &__requestAuthorization{
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        text-align: center;
        float: right
  }

&__selection{

    &__section{
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: auto;
      align-items: center;

      p{
        margin-left: 1rem;
      }

      &__expanded{
        width: 22rem;
      }
    }
}
&__modalStyle{
  width: 26.5rem;
  &__styleButton{
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .modalButton {
      cursor: pointer;
      border: 1px solid #dbdbdb;
      text-align: center;
      border-radius: 4px;
      box-shadow: none;
      font-weight: bold;

      &:hover{
        border: 1px solid #c2c2c2;
      }
    }
  }
}

  &__buttons{
    width: 179px;
    height: 40px;
    margin: 0.5rem;
    font-family: $font-family;
    font-size: $font-size;
    font-weight: $font-weight-bolder;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 6px;
    background-color: $color-primary;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__translateButtons{
    display: flex;
    width: 385px;
    margin: 1rem 0.3rem;
    margin-left: 0.8rem;
    border-radius: 5px;
    justify-content: space-between;
  }
  &__unableButton{
    background-color:$color-grey;
    color: $color-white;
    border: 2px solid #D5D5D5;
    box-shadow: 0 0.1875rem 0.375rem rgba(200, 200, 200, 0.5);
    margin:0;

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

.translate-description{
  margin-left: 0.8rem;
  margin-top: $between-subtitle-content;
  h1{
    font-size: 28px;
    margin-bottom: $between-title-subtitle;
    color: $color-fake-black;
    font-family: $font-family;
    font-weight: $font-weight-bolder;
  }
  p{
    margin-bottom: $between-subtitle-content;
    color: $color-fake-black;
    font-family: $font-family;
    font-size: $font-size
  }
}

.custom-file-upload {
  display: flex;
  flex-direction: column;

  &__input{
   display: flex;
   width: 100%;

   &__button{
     background-color: #9E9E9E;
     padding: 0 2rem;
   }

   &__file{
     border: 1px solid #D5D5D5;
     color: #BABABA;
     font-size: $font-size;
     font-family: $font-family;
     display: flex;
     width: 100%;
     justify-content:center;
     align-items:center;
     border-top-right-radius: 0.4rem;
     border-bottom-right-radius: 0.4rem;

     span{
       font-size: 1rem;
     }
   }
   &__icon{
     cursor: pointer;
     color:#D5D5D5;
     display:flex;
     align-items: center;
     &:hover{
      color: $color-grey-dark;
    }
   }
  }

}

</style>
