<template>
  <container-box class="q-mb-sm">
    <!--STAMINA-->
    <template v-slot:content>
      <div class="row items-center">
        <div class="col text-h6 q-mr-md">STAMINA</div>
        <q-input
          class="col"
          type="number"
          label="MAX"
          v-model="stamina.max"
          dense
          input-class="text-h6 text-center"
          borderless
          :min="0"
        />
        <q-input
          class="col"
          type="number"
          label="CURRENT"
          v-model.number="stamina.cur"
          dense
          input-class="text-h6 text-center"
          borderless
          :min="0"
          :max="stamina.max"
        />
      </div>
    </template>
  </container-box>
</template>

<script setup lang="ts">
import { MaxCurStat } from '../models';

import ContainerBox from './ContainerBox.vue';

const stamina = defineModel<MaxCurStat>({ required: true });
</script>
