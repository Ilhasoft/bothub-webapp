<template>
  <div class="intent-list">
    <div class="intent-list__content">
      <div class="intent-list__content__descriptions">
        <h1> <strong>{{ $t('webapp.intent.title') }}</strong> </h1>
        <p v-if="!editSentences">
          <strong>"</strong> {{ intentSelected }} <strong>"</strong>
        </p>
        <b-field
          v-else
          class="intent-list__content__descriptions__edit-intent">
          <b-input v-model="intentSelected"/>
        </b-field>
      </div>
      <div>
        <b-button
          v-if="!editSentences"
          ref="editIntentEvent"
          class="intent-list__content__button-edit"
          @click.native="editOptionsIntent()">{{ $t('webapp.intent.edit_button') }}</b-button>
        <b-button
          v-else
          ref="saveIntentEvent"
          class="intent-list__content__button-save"
          @click.native="saveEdition()">{{ $t('webapp.intent.save_button') }}</b-button>
      </div>
    </div>
    <div class="intent-list__header__options">
      <p> {{ $tc('webapp.intent.description', totalSentences) }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formatters } from '@/utils';

export default {
  name: 'IntentsList',
  props: {
    IntentsList: {
      type: Object,
      default: null,
    },
    repository: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editSentences: false,
      intentId: this.$route.params.intent,
      errors: {},
      intentSelected: '',
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryList: 'getCurrentRepository',
    }),
    totalSentences() {
      if (this.IntentsList !== null) {
        return this.IntentsList.total;
      }
      return 0;
    },
  },
  watch: {
    intentSelected() {
      this.intentSelected = (formatters.bothubItemKey()(this.intentSelected));
    },
  },
  mounted() {
    this.getSelectedIntent();
  },
  methods: {
    ...mapActions([
      'editIntentName',
      'setUpdateRepository',
    ]),
    editOptionsIntent() {
      this.editSentences = !this.editSentences;
      this.$emit('setAllEntities', this.allEntities);
    },
    async getSelectedIntent() {
      const entity = await this.repository.intents.find(
        intentValue => intentValue.id === Number(this.intentId),
      );
      this.intentSelected = entity.value;
    },
    async saveEdition() {
      try {
        await this.editIntentName({
          intentId: this.intentId,
          text: this.intentSelected,
          repositoryVersion: this.repositoryVersion,
        });
        this.$emit('saveEdition');
      } catch (error) {
        this.$buefy.toast.open({
          message: this.$t('webapp.intent.error_intent'),
          type: 'is-danger',
        });
      }
      this.editOptionsIntent();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
.intent-list {
    margin: 0.4rem;
    margin-bottom: $between-subtitle-content;
      &__options{
        p{
          font-size: $font-size
        }
      }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__descriptions{
        display: flex;

        p{
          font-size: 20px;
          margin-left: 1rem;
          margin-top: -0.01rem;
          strong{
            font-size: 25px;
          }
        }

        &__tag{
        margin: 0.2rem 0.5rem;
        border-radius: 1rem;
        padding: 0 1.1rem;

          div {
            font-size: 1.12rem;
            font-family: $font-family;
            margin-bottom: .1rem;
          }
        }
         @media screen and (max-width: 40em) {
            display: flex;
            flex-direction: column;
          }

          &__edit-intent{
          margin: 0.2rem 0.5rem;
          width: 10rem;
          }
      }

      h1{
        font-size: 1.75rem;
      }

        &__button-edit{
          width: 9.9rem;
          margin-bottom:0.5rem;
          background-color: $color-primary;
          color: #FFFFFF;
        }
        &__button-save{
          width: 9.9rem;
          margin-bottom:0.5rem;
          background-color: $color-secondary-light;
          color: #FFFFFF;
        }
    }

    &__notification {

      margin: 0.5rem;

         @media screen and (max-width: 50em) {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
      }
    }
}
</style>
