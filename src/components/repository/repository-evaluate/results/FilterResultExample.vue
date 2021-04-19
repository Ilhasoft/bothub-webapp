<template>
  <div class="filter-result-example">
    <div class="filter-result-example__filters">
        <div class="filter-result-example__filters__filter">
          <div class="filter-result-example__filters__filter__text">
            {{ $t('webapp.dashboard.filter_by') }}:
          </div>
          <b-field>
            <b-select
              class="filter-result-example__filters__filter__select"
              expanded
              v-model="filterBy"
              :placeholder=" $t('webapp.result.result_all')">
              <option :value="null">{{ $t('webapp.result.result_all') }}</option>
              <option :value="true">{{ $t('webapp.result.result_automatic') }}</option>
              <option :value="false">{{ $t('webapp.result.result_manual') }}</option>
            </b-select>
          </b-field>
        </div>
        <div>
          <b-button
            :disabled="!amountOfCompareEvaluate"
            class="filter-result-example__filters__button"
            type="is-secondary"
            @click="dispatchCompareResults()">Comparar Resultados</b-button>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FilterResultExample',
  data() {
    return {
      filterBy: null
    };
  },
  watch: {
    filterBy() {
      this.$emit('filterType', this.filterBy);
    },
  },
  computed: {
    ...mapGetters([
      'getEvaluatesToCompare',
    ]),
    amountOfCompareEvaluate(){
      return this.getEvaluatesToCompare.length >= 2
    }
  },
  methods: {
    dispatchCompareResults(){
      this.$router.push({
        name: 'repository-result',
        params: {
          resultId: this.getEvaluatesToCompare[0],
          resultsecondId: this.getEvaluatesToCompare[1],
          crossValidation: 'cross-validation'
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.filter-result-example {
  width: 100%;
  margin: 0 auto .5rem;

  &__filters {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: $mobile-width) {
        grid-template-columns: 1fr;
    }

      &__filter {
          display: flex;
          margin-right: 1rem;

        &__text {
          white-space: nowrap;
          align-self: center;
          height: 100%;
          padding: .5rem;
        }
         &__select {
          width: 179px;
        }
      }

        &__button {
          width: 179px;
          height: 36px;
          font-family: $font-family;
          font-size: $font-size;
          color: $color-white;
      }
    }
}
</style>
