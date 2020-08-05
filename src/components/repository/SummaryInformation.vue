<template>
  <div class="summary-information">
    <div class="summary-information__info">
      <h2>{{ $t('webapp.summary.general_informations') }}</h2>
      <div class="summary-information__info__container">
        <div class="summary-information__info__container__training">
          <div @click="navigateToSentences">
            <h1>{{ getCurrentRepository.examples__count }}</h1>
            <p>
              {{ $tc('webapp.summary.information_sentences',
                     getCurrentRepository.examples__count) }}
            </p>
          </div>
          <div @click="scrollToIntent">
            <h1>{{ getCurrentRepository.intents_list.length }}</h1>
            <p>
              {{ $tc('webapp.summary.information_intents',
                     getCurrentRepository.intents_list.length) }}
            </p>
          </div>
          <div @click="scrollToEntity">
            <h1>{{ getCurrentRepository.entities.length }}</h1>
            <p>
              {{ $tc('webapp.summary.information_entities',
                     getCurrentRepository.entities.length) }}
            </p>
          </div>
        </div>
        <div class="summary-information__info__container__general">
          <div class="summary-information__info__container__general__data">
            <b-tooltip
              :label="languagesList"
              class="summary-information__info__container__tooltip"
              multilined
              type="is-dark"
              position="is-bottom">
              <h1>{{ getCurrentRepository.available_languages.length }}</h1>
              <p>{{ $tc('webapp.summary.information_language',
                        getCurrentRepository.available_languages.length) }} </p>
            </b-tooltip>
          </div>
          <div class="summary-information__info__container__general__data">
            <b-tooltip
              :label="contributorsList"
              class="summary-information__info__container__tooltip"
              multilined
              type="is-dark"
              position="is-bottom">
              <h1>{{ getCurrentRepository.authorizations.count }}</h1>
              <p>{{ $tc('webapp.summary.information_contributors',
                        getCurrentRepository.authorizations.count) }} </p>
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="summary-information__intelligence-force">
      <h2>Intelligence force: Regular</h2>
      <div class="summary-information__intelligence-force__relevance__progress">
        <div class="summary-information__intelligence-force__relevance__progress__division">
        <div class="summary-information__intelligence-force__relevance__progress__division__bar"/>
        <div class="summary-information__intelligence-force__relevance__progress__division__bar"/>
        <div class="summary-information__intelligence-force__relevance__progress__division__bar"/>
        <div class="summary-information__intelligence-force__relevance__progress__division__bar"/>
        <div class="summary-information__intelligence-force__relevance__progress__division__bar"/>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { languageListToDict } from '@/utils';

export default {
  name: 'SummaryInformation',
  data() {
    return {
      collapse: true,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
    ]),
    languagesList() {
      const languageObject = Object.values(
        languageListToDict(this.getCurrentRepository.available_languages),
      );
      return languageObject.join(', ');
    },
    contributorsList() {
      const { users } = this.getCurrentRepository.authorizations;
      const usersList = users.map(user => user.nickname);
      return usersList.join(', ');
    },
  },
  methods: {
    scrollToEntity() {
      const el = document.querySelector('#entity-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    scrollToIntent() {
      const el = document.querySelector('#intent-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    navigateToSentences() {
      this.$router.push({
        name: 'repository-training',
      });
    },
    onEdit(value) {
      this.$emit('edit', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.summary-information{

    &__info{
      margin-left: 0.5rem;
        h2{
          color: $color-fake-black;
          font-weight: $font-weight-bolder;
          font-family: $font-family;
          margin-bottom: 1.2rem;
          font-size: 1.75rem;
        }

        &__container{
            width: 100%;
            display: flex;

            &__tooltip{
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
            }

            &__training{
            display: flex;
            height: 156px;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            margin-right: 10px;
            width: 50%;
            border: 1px solid $color-border;

              h1{
                font-size: 47px;
                font-weight: $font-weight-bolder;
                font-family: $font-family;
                margin:0;
              }

              div{

                &:hover{
                  cursor:pointer;
                  color: $color-primary;
                }
              }

              @media screen and (max-width: 60em) {
                width: 80%;
              }
              @media screen and (max-width: 45em) {
                height: 140px * 3;
                flex-direction: column;
              }
            }

            &__general{
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            height: 156px;
            width: 50%;

            @media screen and (max-width: 60em) {
              width: 80%;
              margin-top: 10px;
            }
            @media screen and (max-width: 40em) {
              flex-direction: column;
              margin-bottom: 2rem;
            }

            h2{
              color: $color-fake-black;
              font-weight: $font-weight-bolder;
              font-family: $font-family;
            }

            h1{
              font-size: 47px;
              font-weight: $font-weight-bolder;
              font-family: $font-family;
              margin:0;
            }

              &__data{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 156px;
                width: 49%;
                border: 1px solid $color-border;

                  @media screen and (max-width: 40em) {
                    width:100%;
                    height: 156px * 2;
                    margin-top: 10px;
                  }
              }
            }
              @media screen and (max-width: 60em) {
                display: flex;
                flex-direction: column;
                width: 80%;
              }
        }

      @media screen and (max-width: 70em) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__intelligence-force{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 3rem;
        width: 98.5%;
        margin-top: .8rem;
        margin-left: 0.5rem;
        border: 1px solid $color-border;
        height: 147px;

      &__relevance{
          width: 80%;
          height: 16px;
          background-color: #F5F5F5;
          box-shadow: 0px 3px 6px #00000029;
        &__progress{
          width: 80%;
          background: linear-gradient(to right, #12A391 0%, #00FFDD 100%);

          &__division{
          display:flex;
          &__bar{
            border: 2px solid white;
            height: 16px;
            margin-left: 16%;
          }
      }

          }
        }
    }
}

</style>
