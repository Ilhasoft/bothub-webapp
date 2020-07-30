<template>
  <b-tag
    :closable="closable"
    class="intent-tag"
    size="is-medium"
    rounded
    @close="$emit('close')" >
    <div
      class="intent-tag__container">
      <div class="intent-tag__container__countStyle">{{ count }}</div> {{ entityName }}
    </div>
  </b-tag>
</template>

<script>

export default {
  name: 'IntentTag',
  props: {
    entityName: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
    .intent-tag{
      border-radius: 0px !important;
      font-weight: none !important;
      height: 2.188rem;

      &:hover{
        background-color: #2BBFAC;
        color: #ffffff;

        div > div{
        background-color: #12A391;
        }
      }
        &__container{
        display: flex;
        justify-content: center;
        align-items: center;
            &__countStyle{
            font-size: 12px;
            font-weight: bold;
            border-radius: 1rem;
            min-width:  20px;
            height: 20px;
            margin-right: 0.5rem;
            padding: 0.19rem;
            color: #FFFFFF;
            background-color: #D5D5D5;

            display: flex;
            justify-content: center;
            align-items: center;
            }
        }
    }
</style>
