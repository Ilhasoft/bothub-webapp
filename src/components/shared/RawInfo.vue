<template>
  <div class="raw-info">
    <div class="raw-info__close">
      <b-icon
        icon="close"
        @click.native="closeModal()"/>
    </div>
    <div class="raw-info__title">
      <h1>{{ $t('webapp.raw.raw') }}</h1>
      <p>{{ $t('webapp.raw.raw_subtitle') }}</p>
    </div>
    <div class="raw-info__json">
      <textarea
        :value="text"
        class="column textarea has-fixed-size raw-info__input"
        readonly/>
      <b-icon
        icon="content-copy"
        class="raw-info__copy"
        @click.native="copyText()"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RawInfo',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    text() {
      return JSON.stringify(this.info, undefined, 4);
    },
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.text);
      this.$buefy.toast.open({
        message: 'Json copied',
        type: 'is-success',
      });
    },
    closeModal() {
      this.$parent.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

    .raw-info {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background-color: white;
        height: 30.2rem;
        padding: 1rem;
        padding-left: 2rem;

        &__json{
           position: relative;
           padding: 1.1rem;
           height: 31.25rem;
        }

        &__title{
          padding: 0 1.3rem;

          h1{
            font-family: $font-family;
            font-size: 1.75rem;
            font-weight: $font-weight-bolder;
          }

          p{
            font-family: $font-family;
            font-size: $font-size;
          }
        }

        &__input{
           padding: 1.3rem;
           height: 18.75rem;
           font-family: 'Segoe UI', sans-serif;
           font-size: 1.1rem;
           color: #707070;
        }

        &__copy {
          width: 80%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: $color-grey-dark;
          position: absolute;
          margin-top: -15rem;
          cursor: pointer;
        }

        &__close{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: $color-grey-dark;
          cursor: pointer;
        }
    }
</style>
