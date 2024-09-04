<template>
  <router-view v-if="loaded" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAnidexStore } from './stores/app-store';
import { create } from './lib/utils';

const loaded = ref(false);
const anidex = useAnidexStore();

onBeforeMount(() => {
  // Setup initial data
  if (anidex.campaigns.length == 0) anidex.campaigns.push(create.campaign());

  loaded.value = true;
});
</script>
