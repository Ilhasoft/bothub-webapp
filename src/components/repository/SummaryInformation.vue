<template>
  <div class="summary-information">
    <div class="summary-information__info">
      <div class="summary-information__info__container">
        <h2>{{ $t('webapp.summary.training_informations') }}</h2>
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
      </div>
      <div class="summary-information__info__container">
        <h2 class="summary-information__info__container__title">
          {{ $t('webapp.summary.general_informations') }}
        </h2>
        <div class="summary-information__info__container__general">
          <h1>{{ getCurrentRepository.available_languages.length }}</h1>
          <p>{{ $tc('webapp.summary.information_language',
                    getCurrentRepository.available_languages.length) }}
          </p>
          <!-- <div class="summary-information__info__container__general__data">
            <h1>{{ getCurrentRepository.available_languages.length }}</h1>
            <p>{{ $tc('webapp.summary.information_language',
                      getCurrentRepository.available_languages.length) }} </p>
          </div>
          <div class="summary-information__info__container__general__data">
            <h1>0</h1>
            <p>{{ $tc('webapp.summary.information_contributors', 0) }}</p>
          </div>
          <div class="summary-information__info__container__general__data">
            <h1>0</h1>
            <p>{{ $tc('webapp.summary.information_integrations', 0) }}</p>
          </div> -->
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SummaryInformation',
  data() {
    return {
      collapse: true,
      authorizationsList: [],
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
    ]),
  },
  mounted() {
    // this.updateAuthorizations();
  },
  methods: {
    ...mapActions(['repositoryAuthorizationList']),
    async updateAuthorizations() {
      const users = await this.repositoryAuthorizationList({
        repositoryUuid: this.getCurrentRepository.uuid,
      });
      this.authorizationsList = await users.getAllItems();
    },
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
.teste{
  display:flex;
}
.summary-information{

    &__info{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 0.2rem;

        &__container{
            width: 49%;

            h2{
                color: $color-fake-black;
                font-weight: $font-weight-bolder;
                font-family: $font-family;
                margin-bottom: 1.2rem;
                font-size: 1.75rem;
            }
            &__title{
                margin-left: 0.2rem;
            }

            &__training{
            display: flex;
            height: 156px;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            border: 1px solid #CFD5D9;

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
                      height: 156 * 3px;
                      width: 250px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    }
            }
            &__general{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 156px;
            border: 1px solid #CFD5D9;

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
                width: 250px;
                margin: 0 0.2rem;
                border: 1px solid #CFD5D9;

                }
                @media screen and (max-width: 60em) {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      width: 250px;
                    }
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
        border: 1px solid #CFD5D9;
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
