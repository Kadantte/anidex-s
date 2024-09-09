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

  // Fix data for new structures
  anidex.campaigns.forEach((campaign, i) => {
    // Score Improvements added in 0.3.0
    if (!campaign.kid.improvements) {
      anidex.campaigns[i].kid.improvements = [];
      campaign.mons.forEach((mon, j) => {
        anidex.campaigns[i].mons[j].improvements = [];
      });
    }
  });

  loaded.value = true;
});
</script>
