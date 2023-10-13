<template>
  <div>
    <div v-if="!isNotFound">
      <NSpin />

      <NP>
        {{ urlData.long_url ? "正在跳转至 " + urlData.long_url : "获取中..." }}
      </NP>
      <NButton v-if="urlData?.long_url" type="primary" secondary>
        <NuxtLink :to="urlData.long_url">
          如果你的浏览器没有自动跳转，请点击这里
        </NuxtLink>
      </NButton>
    </div>
    <div v-else>找不到此链接...</div>
    <NDivider />
    ID: {{ id }}
  </div>
</template>

<script setup>
definePageMeta({
  layout: "jump",
});

const id = useRoute().params?.id;

const urlData = ref({
  created_at: null,
  id: null,
  long_url: null,
});
const isNotFound = ref(false);

if (id) {
  (async () => {
    const { data } = await supabase
      .from("short_urls")
      .select()
      .eq("short_url", id)
      .eq('removed', false);

    if (!data || data.length == 0) {
      isNotFound.value = true;
    } else {
      urlData.value = data[0];

      // go to destination
      window.location.href = urlData.value.long_url;
    }

    console.log(data);
  })();
}
</script>
