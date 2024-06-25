<template>
  <div>
    <NH2 class="mb-0">Url shorter 我的短网址</NH2>
    <NH4 class="mt-0 opacity-75">{{ host }}</NH4>
  </div>
  <NDivider />
</template>

<script setup>
const host = ref("...");

onMounted(() => {
  host.value = window.location.host;
});
</script>
