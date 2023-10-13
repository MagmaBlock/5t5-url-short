<template>
  <NSpace>
    <NButton
      @click="handleCopy"
      :type="clipboard.copied.value ? 'primary' : 'default'"
      secondary
      size="small"
    >
      {{ clipboard.copied.value ? "成功" : "复制" }}
    </NButton>
    <NButton @click="handleDelete" secondary size="small">删除</NButton>
  </NSpace>
</template>

<script setup>
import { useUserUrlsStore } from "~/store/userUrls.js";
import { useClipboard } from "@vueuse/core";

const props = defineProps({
  id: Number,
  short_url: String,
});

const emits = defineEmits(["refresh"]);

const message = useMessage();
const store = useUserUrlsStore();

const clipboard = useClipboard();

function handleCopy() {
  clipboard.copy(window.location.origin + "/g/" + props.short_url);
}

async function handleDelete() {
  const deleteResult = await store.deleteURL(props.id);
  if (deleteResult.status === 204) {
    message.success("删除成功");
  }
}
</script>
