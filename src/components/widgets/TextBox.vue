<template>
  <container-box>
    <template v-slot:content>
      <q-input class="row" :label="title" v-model="model" borderless dense />
    </template>
  </container-box>
</template>

<script setup lang="ts">
import ContainerBox from './ContainerBox.vue';

const model = defineModel<string>({ required: true });

defineProps<{
  title: string;
}>();
</script>
