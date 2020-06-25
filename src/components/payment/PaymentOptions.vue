<template>
  <boarding-layout>
    <div class="payment-options">
      <p> {{ this.$t('webapp.payment.options.title') }} </p>
      <h1 class="payment-options__primary payment-options__header">
        {{ this.$t('webapp.payment.options.slogan') }}
      </h1>
      <div class="payment-options__card__container">
        <div
          v-for="(option, index) in content"
          :key="index"
          class="payment-options__card">
          <h2 class="payment-options__primary payment-options__card__title">
            {{ option.title }}
          </h2>
          <div class="payment-options__card__content">
            <p
              class="payment-options__card__text"
              v-html="option.text" />
            <div class="payment-options__primary payment-options__card__price__container">
              <p class="payment-options__card__symbol"> {{ option.symbol }} </p>
              <div class="payment-options__card__price">
                {{ option.price }}
                <p class="payment-options__card__price__subtitle"> {{ option.price_subtitle }} </p>
                <p class="payment-options__card__title"> {{ option.price_text }} </p>
              </div>
            </div>
          </div>
          <b-button
            type="is-primary"
            class="payment-options__card__button"> {{ option.button_text }} </b-button>
        </div>
      </div>
    </div>
  </boarding-layout>
</template>

<script>
import BoardingLayout from '@/components/user/BoardingLayout';

export default {
  name: 'PaymentOptions',
  components: {
    BoardingLayout,
  },
  data() {
    return {
      title: 'Bothub Pricing',
      text: 'Bothub hosts intelligences that work for you',
      content: [
        {
          title: this.$t('webapp.payment.options.free'),
          text: this.$t('webapp.payment.options.free_text'),
          button_text: this.$t('webapp.payment.options.get_free'),
          symbol: '$',
          price: '0',
        },
        {
          title: this.$t('webapp.payment.options.professional'),
          text: this.$t('webapp.payment.options.professional_text'),
          button_text: this.$t('webapp.payment.options.get_started'),
          symbol: '$',
          price: '0.02',
          price_subtitle: this.$t('webapp.payment.options.per_prediction'),
        },
        {
          title: this.$t('webapp.payment.options.custom'),
          text: this.$t('webapp.payment.options.custom_text'),
          button_text: this.$t('webapp.payment.options.contact_us'),
          price_text: this.$t('webapp.payment.options.contact'),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .payment-options {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 4rem 0 0 0;

        &__primary {
            color: $color-primary
        }

        &__header {
          font-size: 2.5rem;
          max-width: 31rem;
        }

        &__card {
            width: 16.438rem;
            background-color: $color-white;
            padding: 2.125rem 1.875rem 1.625rem 1.875rem;
            box-shadow: 0px 3px 6px #00000029;

            /deep/ &__text {
              min-height: 10rem;
              display: block;
            }

            &__content {
              min-height: 17rem;
            }

            &__title {
                font-size: 1.813rem;
            }

            &__button {
                margin-top: 2.625rem;
                width: 90%;
                font-weight: bold;
                white-space: break-spaces;
                height: auto;
                min-height: 2.2rem;
            }

            &__price {
                font-size: 3rem;
                font-weight: bold;
                margin-top: 1rem;

                &__subtitle {
                    font-size: 0.75rem;
                    margin: 0;
                }

                &__container {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
            }

            &__symbol {
                font-size: 1.813rem;
                font-weight: bold;
            }

            &__container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                 > * {
                     margin: 1.4rem;
                 }

                 &:last-child {
                     margin: 0;
                 }
            }
        }
    }
</style>
