<template>
  <container-box>
    <template v-slot:content>
      <div class="row items-center">
        <div class="col-grow">{{ title }}</div>
        <div class="col-3">RANK</div>
        <q-btn class="col-shrink" icon="mdi-plus-circle" flat rounded dense @click="addRow" />
      </div>
      <talent-row v-for="(q, i) in rows" :key="i" v-model="rows[i]" @delete="removeRow(i)" />
    </template>
  </container-box>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { Talent } from '../models';

import ContainerBox from './ContainerBox.vue';
import TalentRow from './TalentRow.vue';

defineProps<{
  title: string;
}>();

const rows = defineModel<Talent[]>({ required: true });

const $q = useQuasar();
const addRow = () => rows.value.push({ name: '', rank: 1 });
const removeRow = (index: number) =>
  $q
    .dialog({
      title: 'Remove row?',
      cancel: true,
    })
    .onOk(() => rows.value.splice(index, 1));
</script>
