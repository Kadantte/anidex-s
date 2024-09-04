<template>
  <q-page class="row column items-center justify-start" padding>
    <q-tab-panels v-model="anidex.campaign.config.tab" animated>
      <q-tab-panel name="kid">
        <kid-tab v-model="anidex.campaign.kid" />
      </q-tab-panel>

      <q-tab-panel name="mons">
        <animon-tab v-model="anidex.mon"></animon-tab>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { useAnidexStore } from 'src/stores/app-store';

import KidTab from 'src/components/KidTab.vue';
import AnimonTab from 'src/components/AnimonTab.vue';

const anidex = useAnidexStore();
</script>
