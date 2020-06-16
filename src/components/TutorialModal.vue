<template>
  <b-modal
    :active="open"
    :width="width"
    @close="$emit('update:open', false)">
    <div class="tutorial">
      <h1> Welcome to Bothub </h1>
      <p> Bothub is an open platform for forecasting,
      training and share NLP data sets in multiple languages.
      <br><br> Follow these steps to be part of our community </p>
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

      <a> Skip for now </a>
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
.tutorial {
    background-color: white;
    border-radius: 10px;
    padding: 2.5rem 3rem;


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
            margin-bottom: 0.12rem;
        }

        &__marker {
            color: white;
            text-align: center;
            border-radius: 50%;
            border: 1px #5D5D5D solid;
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
            margin-right: 1rem;
            &--active {
                background-color: #00C853;
                border: 1px #00C853 solid;
            }
        }
    }
}

</style>
