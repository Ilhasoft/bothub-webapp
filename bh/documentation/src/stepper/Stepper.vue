<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Stepper</h2>
      <h3>Simple</h3>
      <example
        :component="StepperExample"
        :code="stepperExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h3>Action stepper</h3>
      <example
        :component="ActionStepperExample"
        :code="actionStepperExampleCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import StepperExample from './examples/Stepper';
import stepperExampleCode from '!!raw-loader!./examples/Stepper';
import ActionStepperExample from './examples/ActionStepper';
import actionStepperExampleCode from '!!raw-loader!./examples/ActionStepper';
import api from './api';


export default {
  name: 'TooltipHover',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      StepperExample,
      stepperExampleCode,
      ActionStepperExample,
      actionStepperExampleCode,
      api,
    };
  },
};
</script>
