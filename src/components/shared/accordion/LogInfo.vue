<template>
  <div>
    <div class="level">
      <div
        class="level-left log-entities">
        <div v-if="entitiesList.length > 0">
          <b-tag
            v-for="(entity, i) in entitiesList"
            :key="i"
            :class="entity.class"
            rounded>
            <strong v-if="entity.value">{{ entity.value }}</strong>
            <span v-if="entity.value">is</span>
            <strong>{{ entity.entity }}</strong>
          </b-tag>
        </div>
      </div>
      <div class="level-right">
        <b-button
          class="repository-log-info__button"
          rounded
          size="is-small"
          icon-left="chart-pie"
          @click="debug()"> Debug </b-button>
        <b-button
          class="repository-log-info__button"
          rounded
          size="is-small"
          icon-left="file-document-outline"
          @click="showRawInfo()"> Raw </b-button>
      </div>
    </div>
    <div class="log-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>Intent:&nbsp;</strong>
          <span>{{ intent }} ({{ confidence | percent }} confidence)</span>
        </div>
      </div>
      <div class="level-right">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <span>{{ createdAt | moment('from') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInfo',
  props: {
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    confidence: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
      default: '',
    },
  },
  methods: {
    showRawInfo() {
      this.$emit('onShowRawInfo');
    },
    debug() {
      this.$emit('debug');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/utilities.scss';
.repository-log-info {
  &__button {
    margin-right: 0.5rem;
    color: #707070;
  }
}

.log {
  $radius: .5rem;

  margin: 1rem .5rem;
  overflow: visible;
  background-color: $white-bis;
  border-radius: $radius;

  &-text {
    display: flex;
    padding: 1rem 2rem;
    margin-bottom: 4px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;

    &__main {
      flex-grow: 1;
      font-size: 1.25rem;
    }

    &__rigth {
      flex-grow: 0;
    }
  }

  &-entities,
  &-infos {
    padding: .25rem .5rem .3rem 1rem;
  }

  &-entities {
    > * {
      margin: 0 .5rem 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
