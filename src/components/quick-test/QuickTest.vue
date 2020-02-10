<template>
  <div class="quick-test">
    <b-button @click="toggle()"> Quick test </b-button>
    <div
      v-if="!collapsed"
      class="quick-test__container">
      <div class="quick-test__text-area">
        <div v-for="message in messages">
          {{ message }}
          <b-button> Debug </b-button> <b-button> Raw </b-button>
        </div>
      </div>
      <b-input placeholer="Add a text" />
      <b-select> <option> pt-br </option> </b-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickTest',
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messages: [
        "Now, more than any life I'd led",
        'I know that one was the best',
        "'Cause I spent it on my chest",
        'Between her knees',
      ],
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
      this.$emit('update:collapsed', this.collapsed);
    },
  },
};
</script>

<style lang="scss" scoped>
    .quick-test {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 20%;
        right: 2rem;
        width: calc(100% - 4rem);
        max-width: calc(100% - 4rem);
        max-height: 90vh;
        z-index: 9;

        &__container {
            background-color: white;
            border: 10px solid black;
            border-radius: 10px;
            box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
        }
        &__text-area {
            margin: 2rem;
            overflow-y: scroll;
            height: 400px;
        }
    }
</style>
