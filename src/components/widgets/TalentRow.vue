<template>
  <div class="row items-baseline">
    <q-input class="col-grow" label="name" v-model="row.name" dense />
    <q-input class="col-3" type="number" label="rank" v-model.number="row.rank" dense />
    <q-btn class="col-shrink" icon="mdi-delete" rounded flat dense @click="emit('delete')" />
  </div>
</template>

<script setup lang="ts">
import { Talent } from '../models';

const row = defineModel<Talent>({ required: true });
const emit = defineEmits(['delete']);
</script>
