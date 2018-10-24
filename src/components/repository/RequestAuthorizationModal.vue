<template>
  <bh-modal :open.sync="openValue">
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item">
        <h1 class="bh-title-2">Request Authorization</h1>
      </div>
      <pre>
         {{ repositoryUuid }}
      </pre>
      <request-authorization-form
        :repository-uuid="repositoryUuid"
        class="bh-grid__item"
        @requested="onAuthorizationRequested()" />
    </div>
  </bh-modal>
</template>

<script>
import RequestAuthorizationForm from '@/components/repository/RequestAuthorizationForm';


export default {
  name: 'RequestAuthorizationModal',
  components: {
    RequestAuthorizationForm,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    repositoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openValue: this.open,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
  methods: {
    onAuthorizationRequested() {
      this.$emit('requestDispatched');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.train-modal {
  padding: .5rem;

  &__buttons {
    margin-top: 1rem;
  }

  $flags-margin: .25rem;
  &__flags {
    display: inline-flex;
    margin: -($flags-margin);

    &__item {
      margin: $flags-margin;

      &__status {
        vertical-align: middle;
        margin-left: -.25rem;
        color: $color-grey;

        &--ready {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
