<template>
  <div>
    <HeaderTitle />
    <NP>一个简单的 URL 缩短工具, 登录后使用。</NP>
    <NuxtLink to="/">
      <NButton tertiary>
        <template #icon>
          <NIcon><ArrowBack /></NIcon>
        </template>
        Back To Home
      </NButton>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ArrowBack } from "@vicons/ionicons5";
</script>
