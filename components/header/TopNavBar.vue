<template>
  <div class="h-12 bg-zinc-100 shadow-md flex">
    <NuxtLink
      to="/"
      class="grid place-items-center cursor-pointer active:scale-75 duration-150 px-4"
    >
      <NIcon size="20"><HomeIcon /></NIcon>
    </NuxtLink>
    <div class="grid place-items-center px-2">返回主页</div>
  </div>
</template>

<script setup>
import { ArrowBack as HomeIcon } from "@vicons/ionicons5";
</script>
