<template>
  <container-box>
    <template v-slot:content v-if="horizontal">
      <div class="row items-center justify-between">
        <div class="col text-h6 text-center">XP</div>
        <div class="col" v-for="(n, i) in [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10]" :key="i">
          <xp-icon v-if="n != 0" :n="n" :checked="xp <= n - 1" @clicked="xp = n" />
          <q-icon v-else name="mdi-dots-vertical" :size="$q.screen.lt.sm ? 'sm' : 'md'" />
        </div>
        <q-btn class="col-shrink" icon="mdi-close-circle" flat dense rounded @click="xp = 0">
          <q-tooltip>Clear XP</q-tooltip>
        </q-btn>
      </div>
    </template>

    <template v-slot:content v-else>
      <div class="row text-h6 text-center">
        <div class="col">XP</div>
        <q-btn class="col-shrink" icon="mdi-close-circle" flat dense rounded @click="xp = 0">
          <q-tooltip>Clear XP</q-tooltip>
        </q-btn>
      </div>
      <q-separator />
      <div class="row items-center" v-for="(n, i) in [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]" :key="i">
        <xp-icon class="col-12" :n="n" :checked="xp <= n - 1" @clicked="xp = n" />
        <q-icon v-if="n == 6" class="col-12" name="mdi-minus" />
      </div>
    </template>
  </container-box>
</template>

<script setup lang="ts">
import ContainerBox from './ContainerBox.vue';
import XpIcon from './XpIcon.vue';

const xp = defineModel<number>({ required: true });

defineProps<{
  horizontal?: boolean;
}>();
</script>
