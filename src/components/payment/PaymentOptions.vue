<template>
  <div class="payment-options">
    <h2> {{ title }} </h2>
    <h1 class="payment-options__primary payment-options__header"> {{ text }} </h1>
    <div class="payment-options__card__container">
      <div
        v-for="(option, index) in content"
        :key="index"
        class="payment-options__card">
        <h2 class="payment-options__primary payment-options__card__title"> {{ option.title }} </h2>
        <div class="payment-options__card__content">
          <p> {{ cardText }} </p>
          <div class="payment-options__primary payment-options__card__price__container">
            <p class="payment-options__card__symbol"> {{ option.symbol }} </p>
            <div class="payment-options__card__price">
              {{ option.price }}
              <p class="payment-options__card__price__subtitle"> {{ option.price_subtitle }} </p>
            </div>
          </div>
        </div>
        <b-button
          type="is-primary"
          class="payment-options__card__button"> {{ option.button_text }} </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptions',
  data() {
    return {
      title: 'Bothub Pricing',
      text: 'Bothub hosts intelligences that work for you',
      content: [
        {
          title: 'Free', text: '', button_text: 'Get free', symbol: '$', price: '0',
        },
        {
          title: 'Professional', text: '', button_text: 'Get started', symbol: '$', price: '0.02', price_subtitle: 'per prediction',
        },
        {
          title: 'Custom Plan', text: '', button_text: 'Contact us', symbol: 'Contact Sales', price: '',
        },
      ],
      cardText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, pellentesque vulputate quam morbi sem leo. Quis blandit torquent magnis fusce',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

    .payment-options {
        background-color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__primary {
            color: $color-primary
        }

        &__header {
          font-size: 2rem;
          font-weight: bold;
          max-width: 25rem;
        }

        &__card {
            width: 14.625rem;
            background-color: #F5F5F5;
            padding: 2.125rem 1.875rem 1.625rem 1.875rem;
            box-shadow: 0px 3px 6px #00000029;

            &__content {
              min-height: 14.5rem;
            }

            &__title {
                font-size: 1.813rem;
            }

            &__button {
                margin-top: 2.625rem;
            }

            &__price {
                font-size: 3rem;
                font-weight: bold;
                margin-top: 0.5rem;

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
                justify-content: center;
                 > * {
                     margin: 1.6rem;
                 }

                 &:last-child {
                     margin: 0;
                 }
            }
        }
    }
</style>
