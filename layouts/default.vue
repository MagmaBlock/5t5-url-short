<template>
  <NLayout has-sider class="h-screen">
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :collapsed="collapsed"
      :width="240"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <NavMenu />
    </NLayoutSider>
    <NLayout :native-scrollbar="false">
      <NuxtPage class="mx-8 my-6" />
      <Tail />
    </NLayout>
  </NLayout>
</template>

<script setup>
import { useTitle } from "@vueuse/core";

const collapsed = ref(true);
onMounted(() => {
  if (window.innerWidth >= 768) collapsed.value = false;
});

useTitle("我的短网址 Url shorter | 5t5.top");
</script>
