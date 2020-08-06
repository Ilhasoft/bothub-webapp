<template>
  <div
    v-if="current"
    class="history history--current" >
    <div class="history__period">
      <p class="history__period__title">
        {{ $t('webapp.my_profile.payment.payment', { period }) }}
      </p>
      <b-button type="is-primary">
        {{ $tc('webapp.my_profile.reports.predictions', predictions) }}
      </b-button>
    </div>
    <div class="history__total">
      <p class="history__total__title">
        {{ $t('webapp.my_profile.payment.total') }} {{ $n(total, 'currency') }} </p>
      <p
        class="history__details"
        @click="showDetails = !showDetails">
        {{ showDetails ? 'Hide Details' : 'Show Details' }}
      </p>
    </div>
    <div
      :class="{
        'history__values__container': true,
        'history__values__container--closed': !(showDetails && values.length > 0)}">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="history__values">
        <p> {{ value.repository }} </p>
        <div class="history__values__separator"/>
        <p> {{ $n(value.value, 'currency') }} </p>
      </div>
    </div>
  </div>

  <div
    v-else
    class="history history--past" >
    <div class="history__period">
      <p class="history__period__title">
        {{ $t('webapp.my_profile.payment.payment', { period }) }}
      </p>
      <p class="history__total__title"> {{ $n(total, 'currency') }}
        <b-icon
          :class="paid? 'success' : 'danger' "
          :icon="paid ? 'check-bold' : 'close-thick'" />
      </p>
    </div>
    <p/>
  </div>
</template>

<script>
export default {
  name: 'PaymentHistoryItem',
  props: {
    period: {
      type: String,
      default: null,
    },
    current: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    values: {
      type: Array,
      default: () => [],
    },
    currency: {
      type: String,
      default: '',
    },
    predictions: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { showDetails: false };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .success {
        color: $color-success;
    }

    .danger {
        color: $color-danger;
    }

    .history {
        background-color: $color-white;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        box-shadow: 0px 10px 30px #98989838;

        &--current {
            padding: 2.75rem 3.75rem 3.563rem 3.25rem;
        }

        &--past {
            padding: 1.25rem 1.875rem 1.25rem 3.25rem;
        }

        &__period {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 100%;

            &__title {
                font-size: 1.813rem;
            }

            > * {
                margin-right: 1rem;
                &:last-child {
                    margin-right: 0;
                }
            }
        }

        &__values {
            display: flex;
            align-items: flex-end;

            &__container {
                max-height: 800px;
                overflow: hidden;
                transition: max-height 0.5s linear;

               &--closed {
                   max-height: 0;
                }
            }

            &__separator {
                margin: 0 1rem 0.5rem 1rem;
                flex-grow: 1;
                height: 1px;
                transition: max-height 2s linear;
                background-color: $color-grey;
            }
        }

        &__details {
            text-decoration: underline;
            cursor: pointer;
        }

        &__total {

            &__title {
                font-size: 1.5rem;
                font-weight: bold;
            }

            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: flex-end;
        }
    }
</style>
