<template>
  <div>
    <div class="bh-grid bh-grid--column">
      <div class="bh-grid__item item">
        <bh-avatar
          size="large"
          @click="avatarClicked()">
          <bh-icon
            size="medium"
            value="botinho"/>
        </bh-avatar>
      </div>
      <div class="bh-grid__item item">
        <h4>Hi, I'm Botinho. How are you doing?</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarExample',
  methods: {
    avatarClicked() {
      alert('Avatar Clicked');
    },
  },
};
</script>
