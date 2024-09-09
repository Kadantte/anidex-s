<template>
  <container-box>
    <template v-slot:content>
      <div class="row text-center text-h6">
        <span class="col"> {{ title }}</span>
      </div>
      <q-separator />
      <q-input
        v-if="value == undefined"
        class="row"
        type="number"
        v-model.number="model"
        dense
        input-class="text-h6 text-center"
        borderless
      />
      <div class="row text-h6 text-center" v-else>
        <span class="col"> {{ value }}</span>
      </div>

      <slot name="under"></slot>
    </template>
  </container-box>
</template>

<script setup lang="ts">
import ContainerBox from './ContainerBox.vue';

defineProps<{
  title: string;
  value?: number;
}>();

const model = defineModel<number>();
</script>
