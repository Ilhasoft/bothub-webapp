<template>
  <div>
    <div class="bh-grid">
      <div class="bh-grid__item item">
        <bh-avatar
          size="small"
          @click="avatarClicked()">
          <bh-icon
            value="botinho"/>
        </bh-avatar>
      </div>
      <div class="bh-grid__item item">
        <bh-avatar
          size="normal"
          @click="avatarClicked()">
          <bh-icon
            size="small"
            value="botinho"/>
        </bh-avatar>
      </div>
      <div class="bh-grid__item item">
        <bh-avatar
          size="medium"
          @click="avatarClicked()">
          <bh-icon
            size="normal"
            value="botinho"/>
        </bh-avatar>
      </div>
      <div
        class="bh-grid__item item"
        @click="avatarClicked()">
        <bh-avatar
          size="large">
          <bh-icon
            size="medium"
            value="botinho"/>
        </bh-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarSize',
  methods: {
    avatarClicked() {
      alert('Avatar Clicked');
    },
  },
};
</script>
