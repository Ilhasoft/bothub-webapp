<template>
  <layout>
    <div class="orgs__buttons">
      <b-button type="is-primary"> Create Org </b-button>
    </div>
    <org-list />
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import OrgList from '@/components/user/OrgList';

export default {
  name: 'Orgs',
  components: {
    Layout,
    OrgList,
  },
};
</script>

<style lang="scss" scoped>
    .orgs {
        &__buttons {
            display: flex;
            flex-direction: row-reverse;
            margin: 3rem 1.5rem 3rem 0;
        }
    }
</style>
