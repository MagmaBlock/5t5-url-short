<template>
  <div>
    <NSpin :show="store.state.isLoading">
      <NResult
        status="404"
        title="获取历史短链失败"
        :description="store.state.isError"
        v-if="store.state.isError"
      />
      <NDataTable
        :columns="columns"
        :data="store.urls"
        :scroll-x="400"
        striped
        :pagination="{ pageSize: 6, pageSlot: 6 }"
        v-else
      />
    </NSpin>
  </div>
</template>

<script setup>
import { useUserUrlsStore } from "~/store/userUrls.js";
import UserUrlsTableActions from "./TableActions.vue";
import { NuxtLink } from "#components";

const store = useUserUrlsStore();

const columns = [
  {
    title: "长链",
    key: "long_url",
    ellipsis: true,
    render(row) {
      return h(
        NuxtLink,
        { to: row.long_url, target: "_blank" },
        { default: () => row.long_url }
      );
    },
  },
  {
    title: "短链",
    key: "short_url",
    width: 100,
    render(row) {
      return h(
        NuxtLink,
        { to: "/g/" + row.short_url, target: "_blank" },
        { default: () => row.short_url }
      );
    },
  },
  {
    title: "操作",
    key: "actions",
    width: 150,
    render(row) {
      return h(UserUrlsTableActions, { id: row.id, short_url: row.short_url });
    },
  },
];

onMounted(async () => {
  store.state.isLoading = true;
  await store.getUserID();
  await store.fetchData();
  store.state.isLoading = false;
});
</script>
