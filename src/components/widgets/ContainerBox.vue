<template>
  <div class="box-border q-pa-sm column">
    <slot name="content"></slot>
  </div>
</template>

<style scoped>
.box-border {
  border: 5px solid black;
  border-radius: 20px;
}
</style>
