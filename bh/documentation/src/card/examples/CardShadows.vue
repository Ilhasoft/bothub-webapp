<template>
  <div class="bh-grid">
    <bh-card
      class="bh-grid__item"
      shadow="">
       <div class="bh-grid">
         <div class="bh-grid__item item">
           <h4>No shadow</h4>
         </div>
      </div>
    </bh-card>
   <bh-card
      class="bh-grid__item"
      shadow="light">
       <div class="bh-grid">
         <div class="bh-grid__item item">
           <h4>light shadow</h4>
         </div>
      </div>
    </bh-card>
    <bh-card
      class="bh-grid__item"
      shadow="strong">
       <div class="bh-grid">
         <div class="bh-grid__item item">
           <h4>strong shadow</h4>
         </div>
      </div>
    </bh-card>
    <bh-card
      class="bh-grid__item"
      shadow="hard">
       <div class="bh-grid">
         <div class="bh-grid__item item">
           <h4>hard shadow</h4>
         </div>
      </div>
    </bh-card>
  </div>
</template>

<script>
export default {
  name: 'CardShadows',
};
</script>

