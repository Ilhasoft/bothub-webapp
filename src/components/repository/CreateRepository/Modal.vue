<template>
  <div
    :class="['modal__bases', type]"
    @click.self="
      () => {
        if (!isPersistent) {
          close();
        }
      }
    "
  >
    <div class="modal-container">
      <div
        v-if="type === 'confirm'"
        :class="['content', { 'with-validation': data.validate }]"
      >
        <div class="icon">
          <unnnic-icon-svg
            :icon="data.icon"
            :scheme="data.scheme"
            size="xl"
          ></unnnic-icon-svg>
        </div>

        <div class="title">{{ data.title }}</div>

        <div class="description" v-html="data.description"></div>

        <div v-if="data.validate" class="confirm-text">
          <unnnic-input
            :placeholder="data.validate.placeholder"
            v-model="confirmText"
          >
            <span slot="label" v-html="data.validate.label" />
          </unnnic-input>
        </div>

        <div class="actions">
          <unnnic-button type="terciary" @click="close" :disabled="loading">
            {{ data.cancelText }}
          </unnnic-button>

          <unnnic-button
            type="primary"
            @click="data.onConfirm(justClose, { setLoading })"
            :class="['button', buttonType]"
            :disabled="disabled"
            :loading="loading"
          >
            {{ data.confirmText }}
          </unnnic-button>
        </div>
      </div>

      <template v-else-if="type === 'alert'">
        <div class="header">
          <unnnic-icon-svg icon="close-1" size="sm" clickable @click="close" />
        </div>

        <div class="content">
          <div class="icon">
            <unnnic-icon-svg
              :icon="data.icon"
              :scheme="data.scheme"
              size="xl"
            ></unnnic-icon-svg>
          </div>

          <div class="title">{{ data.title }}</div>

          <div class="description">
            <div v-html="data.description"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <span></span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },

    type: {
      type: String,
    },

    data: {
      type: Object,
    },
  },

  data() {
    return {
      confirmText: '',
      loading: false,
    };
  },

  computed: {
    isPersistent() {
      return this.data && this.data.persistent;
    },

    buttonType() {
      const scheme = this.data && this.data.scheme;

      let type = '';

      if (scheme === 'feedback-red') {
        type = 'danger';
      } else if (scheme === 'feedback-yellow') {
        type = 'alert';
      }

      if (this.disabled) {
        return '';
      }

      return type;
    },

    disabled() {
      return (
        this.data && this.data.validate && this.data.validate.text
        && this.confirmText !== this.data.validate.text
      );
    },
  },

  methods: {
    close() {
      this.justClose();

      if (this.data.onClose) {
        this.data.onClose();
      }
    },

    justClose() {
      this.$emit('close');
    },

    setLoading(loading) {
      this.loading = loading;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';

.modal__bases {
  z-index: 5;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, $unnnic-opacity-level-overlay);
  display: flex;
  align-items: center;
  padding: 0 12.88%;
  box-sizing: border-box;

  .modal-container {
    flex: 1;
    max-height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    border-radius: $unnnic-border-radius-sm;
    background-color: $unnnic-color-background-carpet;
    box-shadow: $unnnic-shadow-level-separated;

    .content {
      $scroll-size: $unnnic-inline-nano;

      flex: 1;
      overflow: overlay;

      padding-right: calc(#{$unnnic-inline-xs} + #{$scroll-size});
      width: 100%;
      text-align: center;

      &::-webkit-scrollbar {
        width: $scroll-size;
      }

      &::-webkit-scrollbar-thumb {
        background: $unnnic-color-neutral-clean;
        border-radius: $unnnic-border-radius-pill;
      }

      &::-webkit-scrollbar-track {
        background: $unnnic-color-neutral-soft;
        border-radius: $unnnic-border-radius-pill;
      }
    }
  }

  &.youtube-video {
    .modal-container {
      max-width: 60rem;
      margin: 0 auto;
      padding: 0 $unnnic-inline-md;
      padding-top: $unnnic-spacing-stack-giant;
      padding-bottom: $unnnic-spacing-stack-lg;
    }

    .content {
      .aspect-ratio-box {
        height: 0;
        overflow: hidden;
        padding-top: 9 / 16 * 100%;
        position: relative;
      }

      .aspect-ratio-box-inside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  .icon {
    text-align: center;
    margin-bottom: $unnnic-spacing-stack-sm;
  }

  .title {
    text-align: center;
    font-family: $unnnic-font-family-secondary;
    color: $unnnic-color-neutral-darkest;
    font-weight: $unnnic-font-weight-black;
    font-size: $unnnic-font-size-title-sm;
    line-height: ($unnnic-font-size-title-sm + $unnnic-line-height-medium);
  }

  .description {
    text-align: center;

    font-family: $unnnic-font-family-secondary;
    color: $unnnic-color-neutral-cloudy;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
  }

  &.confirm .modal-container {
    max-width: 31.125rem;
    margin: 0 auto;
    padding: 0 $unnnic-spacing-stack-lg;
    padding-top: $unnnic-spacing-stack-giant;
    padding-bottom: $unnnic-inline-md;

    .description {
      margin-bottom: $unnnic-spacing-stack-giant;
    }

    .content.with-validation .description {
      margin-bottom: $unnnic-spacing-stack-lg;
    }

    .confirm-text {
      margin-bottom: $unnnic-spacing-stack-lg;
    }

    .actions {
      display: grid;
      column-gap: $unnnic-inline-lg;
      grid-auto-columns: 0.5fr;
      grid-auto-flow: column;

      .button {
        &.danger:not([disabled]) {
          background-color: $unnnic-color-feedback-red;
          color: $unnnic-color-neutral-snow;
        }

        &.alert:not([disabled]) {
          background-color: $unnnic-color-feedback-yellow;
          color: $unnnic-color-neutral-snow;
        }
      }
    }
  }

  &.alert .modal-container {
    max-width: 31.125rem;
    margin: 0 auto;
    padding: 0 $unnnic-inline-md;
    padding-top: $unnnic-spacing-stack-sm;
    padding-bottom: $unnnic-spacing-stack-giant;

    .header {
      margin-bottom: $unnnic-spacing-stack-xs;
      text-align: right;
    }
  }
}
</style>
