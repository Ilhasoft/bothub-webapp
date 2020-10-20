<template>
  <div class="summary-information">
    <div class="summary-information__info">
      <h2>{{ $t('webapp.summary.general_information') }}</h2>
      <div class="summary-information__info__container">
        <div class="summary-information__info__container__training">
          <numbers-card
            :count="getCurrentRepository.examples__count"
            :label="$tc('webapp.summary.information_sentences',
                        getCurrentRepository.examples__count)"
            clickable
            @click="navigateToSentences"
          />
          <numbers-card
            :count="getCurrentRepository.intents_list.length"
            :label="$tc('webapp.summary.information_intents',
                        getCurrentRepository.intents_list.length)"
            clickable
            @click="scrollToIntent"
          />
          <numbers-card
            :count="getCurrentRepository.entities.length"
            :label="$tc('webapp.summary.information_entities',
                        getCurrentRepository.entities.length)"
            clickable
            @click="scrollToEntity"
          />
        </div>
        <div class="summary-information__info__container__general">
          <div class="summary-information__info__container__general__data">
            <numbers-card
              :help-text="languagesList"
              :count="getCurrentRepository.available_languages.length"
              :label="$tc('webapp.summary.information_language',
                          getCurrentRepository.available_languages.length)"
            />
          </div>
          <div class="summary-information__info__container__general__data">
            <numbers-card
              :help-text="contributorsList"
              :count="getCurrentRepository.authorizations.count"
              :label="$tc('webapp.summary.information_contributors',
                          getCurrentRepository.authorizations.count)"
            />
          </div>
          <div class="summary-information__info__container__general__data">
            <numbers-card
              :count="getCurrentRepository.count_authorizations"
              :label="$tc('webapp.summary.information_integrations',
                          getCurrentRepository.count_authorizations)"
            />
          </div>
        </div>
      </div>
    </div>
    <intelligence-force/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { languageListToDict } from '@/utils';
import NumbersCard from '@/components/shared/NumbersCard';
import IntelligenceForce from '@/components/repository/IntelligenceForce';

export default {
  name: 'SummaryInformation',
  components: {
    NumbersCard,
    IntelligenceForce,
  },
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

            &__training{
            display: flex;
            height: 156px;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            margin-right: 10px;
            width: 50%;
            border: 1px solid $color-border;

              @media screen and (max-width: 60em) {
                width: 100%;
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
              width: 100%;
              margin-top: 10px;
            }
            @media screen and (max-width: 40em) {
              flex-direction: column;
              margin-bottom: 10rem;
            }

              &__data{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 156px;
                width: 49%;
                border: 1px solid $color-border;
                cursor: pointer;

                  @media screen and (max-width: 40em) {
                    width:100%;
                    height: 156px * 2;
                    margin-top: 10px;
                  }
              }
              &__data:nth-child(2){
                margin: 0 0.3rem;

                @media screen and (max-width: 40em) {
                    margin-top: 0.6rem;
                }
              }
            }
              @media screen and (max-width: 60em) {
                display: flex;
                flex-direction: column;
                width: 100%;
              }
        }

      @media screen and (max-width: 70em) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
}

</style>
