<template>
  <NuxtLink :to="to">
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: "",
  },
});
</script>
