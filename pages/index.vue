<template>
  <div>
    <HeaderTitle />
    <div class="flex gap-2 my-4">
      <NInput
        placeholder="输入长的"
        v-model:value="longUrl"
        class="w-full"
      ></NInput>
      <NButton
        type="primary"
        strong
        secondary
        @click="createNewShortUrl"
        :loading="isCreateLoading"
      >
        <template #icon>
          <NIcon>
            <ArrowForward />
          </NIcon>
        </template>
        Short it!
      </NButton>
    </div>

    <NInputGroup class="max-w-xs">
      <NInputGroupLabel>https://5t5.top/</NInputGroupLabel>
      <NInput :placeholder="customShortUrl" v-model:value="customShortUrl" />
      <NButton
        type="primary"
        secondary
        @click="() => (customShortUrl = randomShortUrl())"
      >
        <template #icon>
          <NIcon><Refresh /></NIcon>
        </template>
        换一个
      </NButton>
    </NInputGroup>
    <NDivider />
    <UserUrlsDataTable />
  </div>
</template>

<script setup>
import { ArrowForward, Refresh } from "@vicons/ionicons5";
import cryptoRandomString from "crypto-random-string";
import { useUserUrlsStore } from "~/store/userUrls.js";

const message = useMessage();
const store = useUserUrlsStore();

const longUrl = ref(null);
const customShortUrl = ref(null);

let userID = null;

(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (!error) {
    userID = data.user.id;
  } else {
    message.warning("您还未登录, 请先登录");
  }
})();

onMounted(async () => {
  customShortUrl.value = randomShortUrl();
});

const randomShortUrl = () => {
  return cryptoRandomString({ length: 5, type: "alphanumeric" });
};

const isCreateLoading = ref(false);
async function createNewShortUrl() {
  isCreateLoading.value = true;

  try {
    new URL(longUrl.value);
  } catch (error) {
    message.error("输入的网址不是正确的 URL");
    isCreateLoading.value = false;
    return;
  }

  let result = await supabase.from("short_urls").insert([
    {
      short_url: customShortUrl.value,
      long_url: longUrl.value,
    },
  ]);

  if (result.status === 201) {
    message.success("创建成功");
    customShortUrl.value = randomShortUrl();
    store.fetchData();
  }

  if (result?.status === 401) {
    message.error("创建失败: 当前账户不能创建短链. 您可能未登录");
  } else if (result.error) {
    message.error("创建失败: " + result.error?.message);
  }

  isCreateLoading.value = false;
}
</script>
