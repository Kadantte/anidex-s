<template>
  <container-box>
    <template v-slot:content>
      <div class="row text-center text-h6">
        <span class="col"> {{ title }}</span>
      </div>
      <q-separator />
      <div class="row items-center">
        <q-input
          v-if="model && max == undefined"
          class="col"
          type="number"
          label="MAX"
          v-model.number="model.max"
          dense
          input-class="text-h6 text-center"
          borderless
        />
        <q-input
          v-else
          readonly
          class="col"
          :model-value="max"
          label="MAX"
          dense
          input-class="text-h6 text-center"
          borderless
        />
        <q-input
          v-if="model"
          class="col"
          type="number"
          label="CURRENT"
          v-model.number="model.cur"
          dense
          input-class="text-h6 text-center"
          borderless
        />
      </div>
    </template>
  </container-box>
</template>

<script setup lang="ts">
import ContainerBox from 'src/components/widgets/ContainerBox.vue';
import { MaxCurStat } from '../models';

const model = defineModel<MaxCurStat>();
defineProps<{
  title: string;
  max?: number;
}>();
</script>
