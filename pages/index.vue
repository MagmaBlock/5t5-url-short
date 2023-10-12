<template>
  <div>
    <HeaderTitle />
    <div class="flex gap-2">
      <NInput placeholder="输入长的" class="w-full"></NInput>
      <NButton type="primary" strong secondary>
        <template #icon>
          <NIcon>
            <ArrowForward />
          </NIcon>
        </template>
        Short it!
      </NButton>
    </div>
  </div>
</template>

<script setup>
import { ArrowForward } from "@vicons/ionicons5";
</script>
