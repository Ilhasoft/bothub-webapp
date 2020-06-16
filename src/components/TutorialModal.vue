<template>
  <b-modal
    :active="open"
    :width="width"
    :can-cancel="false"
    @close="$emit('update:open', false)">
    <div class="tutorial">
      <div class="tutorial__title">
        <h1> Welcome to Bothub </h1>
        <p> Bothub is an open platform for forecasting,
        training and share NLP data sets in multiple languages.
        <br><br> Follow these steps to be part of our community </p>
      </div>
      <div class="tutorial__steps">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="tutorial__item__wrapper">

          <span
            :class="{'tutorial__item__marker': true,
                     'tutorial__item__marker--active': item.active}">
            <b-icon
              v-show="item.active"
              size="is-small"
              icon="check" />
          </span>
          <span
            :class="{'tutorial__item': true,
                     'tutorial__item--finished': item.active}">{{ item.label }}</span>
        </div>
      </div>

      <a @click="$emit('update:open', false)"> Skip for now </a>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'TutorialModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: 443,
      list: [],
    };
  },
  mounted() {
    let i;
    for (i = 0; i < 7; i++) {
      this.list.push({ label: `Tutorial item number ${i}`, active: Math.random() > 0.5 });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

a {
    color: inherit;
    text-decoration: underline;
}
.tutorial {
    background-color: white;
    border-radius: 10px;
    padding: 2.5rem 3rem;

    &__title {
        text-align: center;
        h1 {
            color: $color-primary;
            font-size: 2.6rem;
        }
    }

    &__steps {
        margin: 2rem 0 2.5rem 0;
    }

    &__item {
        &:hover {
            font-weight: bold;
        }

        &--finished {
            text-decoration: line-through;
        }

        &__wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }

        &__marker {
            color: white;
            text-align: center;
            border-radius: 50%;
            border: 1px $color-grey-darker solid;
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
            margin-right: 1rem;
            &--active {
                background-color: $color-success;
                border: 1px $color-success solid;
            }
        }
    }
}

</style>
