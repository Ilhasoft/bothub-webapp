<template>
  <div class="bh">
    <div class="bh-card">
      <div class="bh-card__left">
        <div class="bh-card__left__content">
          <slot />
        </div>
      </div>
      <div
        v-if="$slots.right"
        class="bh-card__right">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BhCard',
};
</script>
<style lang="scss" scoped>
@import '~bh/assets/scss/bh.scss';

 .bh {
   background-color: $color-primary-inverted;
   @include typography();

   span {
     color:black;
   }

   &-card{
    display: flex;
    flex-direction: row;
    margin: 1rem 0.75rem;
    border: 1px solid rgba(207, 213, 217, 1);
    border-radius: 4px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.16);
    transition: 0.3s;

    &__left{
      position: relative;
      flex-grow: 1;
      height: auto;
      border-color: #ebebeb;
      border-style: double;
      border-width: 0px 2px 0px 0px;

      p{
        color:$color-grey;
      }

      &__content{
        display: flex;
        flex-grow: 1;
        align-items: center;

        padding: 20px 20px 20px 20px;

        &__flex-display{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;

          &__label{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 30%;
            margin-top: 20px;
          }
        }
      }
    }

    &__right{
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 40%;
      padding: 15px 5px 15px 15px;

      &__space-around{
        margin-bottom: 5px;
      }
    }
   }
 }

</style>
