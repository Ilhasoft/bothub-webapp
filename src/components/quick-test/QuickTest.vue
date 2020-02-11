<template>
  <div class="quick-test">
    <div
      class="quick-test__collapse-button"
      @click="toggle()">
      <p class="quick-test__collapse-button__text"> QUICK TEST {{ collapsed ? '<' : '>' }}</p>
    </div>
    <div
      :class="['quick-test__container', collapsed ? 'collapsed' : 'expanded']">
      <div class="quick-test__inner-container">
        <div class="quick-test__text-area">
          <div
            v-for="message in messages"
            class="quick-test__message">
            <p class="quick-test__message__text">{{ message }}</p>
            <p class="quick-test__message__subtext">
              <span class="quick-test__message__subtext__dot"/>
              <strong>Intent: </strong>
              violence(100%)
            </p>
            <p class="quick-test__message__subtext">
              <span class="quick-test__message__subtext__dot"/>
              <strong>Greetings: </strong>
              ola, hi
            </p>
            <div class="field is-grouped is-grouped-centered">
              <b-button
                class="quick-test__message__button"
                icon-right="pencil"> Debug </b-button>
              <b-button
                class="quick-test__message__button"
                icon-right="pencil"> Raw </b-button>
            </div>
          </div>
        </div>
        <div class="quick-test__input field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              placeholder="Add a text">
          </div>
          <div class="control">
            <div class="select">
              <select>
                <option
                  v-for="language in languages">
                  <language-badge :language="language"/>
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'QuickTest',
  components: {
    LanguageBadge,
  },
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
        'And her rivers, still they run',
        'When they crash into the sun',
        'In some life will I be young enough to see?',
      ],
      languages: [
        'pt-br',
        'en',
        'simlish',
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

  .expanded {
    transition: margin-right .3s ease-out;
    margin: 0 1rem 0 0;
  }

  .collapsed {
    transition: margin-right .3s ease-out;
    margin: 0 -50% 0 0;
  }

    .quick-test {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 20%;
        right: 0;
        z-index: 9;

        &__message {

          margin: 0 0 0.6rem 0;

          &__text {
            margin: 0 1.175rem 0 0;
            color: #707070;
            text-align: left;
            font-weight: bold;
            font-size: 18px;
          }

          &__button {
            margin: 0 1.6rem 0 0;
          }

          &__subtext {
            margin-left: 1.75rem;
            &__dot {
              height: 1rem;
              width: 1rem;
              background-color: #2BBFAC;
              border-radius: 50%;
              display: inline-block;
            }
          }
        }

        &__collapse-button {
          background-color: #2BBFAC;
          border-radius: 1rem 0 0 1rem;
          height: 2.25rem;
          width: 5rem;
          padding: 0.75rem;
          font-weight: bold;
          font-size: 0.6rem;
          color: white;
          text-align: center;
          display: flex;
          margin-top: 3rem;

          &__text {
            margin: 0 auto;;
          }
        }

        &__input {
          margin: 0.5rem;
        }

        &__container {
          display: flex;
          align-items: stretch;
          width: calc(100% - 16rem);
          max-width: calc(100% - 16rem);
          border: 7px solid #2F343D;
          border-radius: 10px;
          box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
          background-color: #2F343D;
        }
        &__inner-container {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          word-wrap: break-word;
          background-color: white;
        }

        &__text-area {
            border-radius: 10px;
            margin: 1.25rem 0.6rem 0.6rem 1.125rem;
            overflow-y: scroll;
            height: 400px;
        }
    }
</style>
