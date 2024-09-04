<template>
  <q-icon
    :name="checked ? 'mdi-circle-outline' : 'mdi-circle'"
    style="cursor: pointer"
    :size="$q.screen.lt.sm ? 'sm' : 'md'"
    @click="emit('clicked')"
  />
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean;
  n: number;
}>();

const emit = defineEmits(['clicked']);
</script>
