<template>
  <div>
    <bh-tabs v-model="activeTab">
      <bh-tab-item label="Pictures">
        <bh-button
          primary
          tooltip-hover="I'm Tooltip">Button Tooltip visible</bh-button>
      </bh-tab-item>

      <bh-tab-item label="Music">
        <p>John mayer</p>
        <p>Led zeppelin</p>
      </bh-tab-item>

      <bh-tab-item
        label="Books">
        <p>
          Nunc nec velit nec libero vestibulum eleifend.
          Curabitur pulvinar congue luctus.
          Nullam hendrerit iaculis augue vitae ornare.
          Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
        </p>
      </bh-tab-item>
    </bh-tabs>
  </div>
</template>

<script>
export default {
  name: 'TabNavigationExample',
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
