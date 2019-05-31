
@import '@scss/variables.scss';
@import '@scss/colors.scss';


.bh {
  &-badge {
    $border-width: 2px;

    @mixin badge-heigth($size-value) {
      height: $size-value;
      line-height: calc(#{$size-value} - #{($border-width * 2)});
      border-radius: ($size-value / 2);
    }

    @include badge-heigth($size-normal);
    display: inline-flex;
    padding: 0 1.5rem;
    font-size: 1.25rem;
    border-color: transparent;
    border-style: solid;
    border-width: $border-width;

    &--small {
      @include badge-heigth($size-small);
      height: 1.9rem;
      padding: 0 1rem;
      font-size: .75rem;
      line-height: calc(1.9rem - #{($border-width * 2)});
    }

    &--medium {
      @include badge-heigth($size-medium);
      padding: 0 1.5rem;
      font-size: 1.25rem;
    }

    &--large {
      @include badge-heigth($size-large);
      padding: 0 1.75rem;
      font-size: 1.5rem;
    }

    @each $color in $colors {
      $color-name: nth($color, 1);
      $color-value: nth($color, 2);
      $color-inverted: nth($color, 3);

      &--#{$color-name} {
        color: $color-inverted;
        background-color: $color-value;
        border-color: $color-value;

        &-transparent {
          color: $color-value;
          border-color: $color-value;
        }
      }
    }

    > * {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
