<template>
  <div class="pie" :data-percent="validPercent">
    <div class="pie-percent">{{ (percent/100) | percent }}</div>
  </div>
</template>

<script>
const validsPercents = [
  0,
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  55,
  60,
  65,
  70,
  75,
  80,
  85,
  90,
  95,
  100,
];

export default {
  name: 'Pie',
  props: {
    percent: {
      type: Number,
      required: true,
    },
  },
  computed: {
    validPercent() {
      return validsPercents.reduce(
        (current, next) => (next <= this.percent ? next : current),
        validsPercents[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

$pie-size: 100px;
$pie-border: 8px;

.pie {
  display: inline-block;
  position: relative;
  width: $pie-size;
  height: $pie-size;
  border-radius: 50%;
  background-color: #CEEDE9;
  background-image: linear-gradient(to right, transparent 50%, $primary 0);
  position: relative;

  &-percent {
    $height: $pie-size - $pie-border * 2;
    position: absolute;
    top: $pie-border;
    left: $pie-border;
    width: $pie-size - $pie-border * 2;
    height: $height;
    line-height: $height;
    background-color: $white-ter;
    border-radius: 100%;
    text-align: center;
  }

  &:before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
  }

  $valid-percents: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
  55, 60, 65, 70, 75, 80, 85, 90, 95, 100;
  @each $valid-percent in $valid-percents {
    &[data-percent='#{$valid-percent}']:before {
      @if $valid-percent < 10 {
        transform: rotate(#{'.0' + $valid-percent + 'turn'});
      } @else if $valid-percent <= 50 {
        transform: rotate(#{'.' + $valid-percent + 'turn'});
      } @else {
        $valid-percent-half: $valid-percent - 50;

        background: $primary;
        transform-origin: left;

        @if $valid-percent-half < 10 {
          transform: rotate(#{'.0' + $valid-percent-half +'turn'});
        } @else {
          transform: rotate(#{'.' + $valid-percent-half +'turn'});
        }
      }
    }
  }
}
</style>

