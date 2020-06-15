<template>
  <div class="example">
    <example-accordion
      :id="id"
      :text="text"
      :entities="entities"
      :intent="intent"
      :language="language"
      :all-entities="allEntities"
      :able-to-example="true"
      training
      @deleted="onExampleDeleted"
      @updateList="onExampleSave"
    />
  </div>
</template>

<script>
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'ExampleItem',
  components: {
    ExampleAccordion,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '...',
    },
    language: {
      type: String,
      default: null,
    },
    getAllEntities: {
      type: Array,
      default: () => [],
    },
    intent: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    created_at: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  data() {
    return {
      allEntities: [],
    };
  },
  mounted() {
    this.getEntitiesName();
  },
  methods: {
    async getEntitiesName() {
      const allEntitiesName = await this.repository.entities.map(
        entityValue => entityValue.value,
      );
      this.allEntities = allEntitiesName;
    },
    onExampleDeleted() {
      this.$emit('deleted');
    },
    onExampleSave() {
      this.$emit('updateList');
    },
  },
};
</script>
